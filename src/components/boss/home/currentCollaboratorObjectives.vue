<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23">
                Seguimiento
            </a-col>
            <a-col :span="1" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <div v-show="!collapsed" style="margin: 25px 26px; padding-bottom: 30px;">
            <a-row :key="collaborator.id" v-for="collaborator in data"
                class="collapse-single-wrapper"
            >
                <a-col :span="24" class="collapse-single-header">
                    <a-col :span="20">
                        <a-avatar shape="circle" :src="collaboratorImgUrl(collaborator.number)" />
                        <a class="table-link" style="margin-left: 5px;"
                            @click="currentCollaborator = (collaborator.id !== currentCollaborator)?
                                collaborator.id:0">
                            {{collaborator.name}}
                        </a>
                    </a-col>
                    <a-col :span="4">
                        <p><a-progress :percent="objectivesPercet(collaborator.objectives)"
                            :showInfo="false"
                            size="small"
                        /></p>
                        <p><small>({{objectivesCount(collaborator.objectives)}})</small></p>
                    </a-col>
                </a-col>
                <a-col :span="24" class="collapse-single-content"
                    v-show="currentCollaborator == collaborator.id">
                    <a-table
                        :columns="columns"
                        :dataSource="collaborator.objectives"
                        :pagination=false
                    >
                        <span slot="status" slot-scope="status">
                            <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                        </span>
                        <span slot="objective" slot-scope="objective">
                            <p><a
                                class="table-link"
                                @click="toggleViewProgressModal"
                            >
                                {{objective.title}}
                            </a></p>
                            <p><small>{{objective.subtitle}}</small></p>
                        </span>
                        <span slot="action" slot-scope="text, record">
                            <a-dropdown>
                                <a-menu slot="overlay">
                                    <a-menu-item key="1" @click="toggleViewProgressModal(record)">
                                        Ver avances
                                    </a-menu-item>
                                </a-menu>
                                <a-button class="ant-btn-small">
                                    ...
                                </a-button>
                            </a-dropdown>
                        </span>
                    </a-table>
                </a-col>
            </a-row>
        </div>

        <a-modal
            v-model="viewProgressModal.show"
            onOk="toggleViewProgressModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-header">
                        <h1>Ver avances</h1>
                        <small>(Nombre del Objetivo) - (Nombre del colaborador)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24"  style="padding: 0px 20px;">
                    <a-timeline>
                        <!-- <a-timeline-item color="gray" class="timeline-item">
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" src="/user2.jpg"/> Leonardo Juárez
                                <small>13/07/2018 01:32:40 pm</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                Se han definido las características del producto.
                            </p>
                        </a-timeline-item> -->

                    </a-timeline>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleViewProgressModal"
                >
                    Cerrar
                </a-button>
            </template>
        </a-modal>

    </div>
</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

const columns = [
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
    }, {
        title: 'Objectivo',
        dataIndex: 'objective',
        key: 'objective',
        scopedSlots: { customRender: 'objective' },
    }, {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: '',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        align: 'right',
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            currentCollaborator: 0,
            columns,
            viewProgressModal: {
                show: false,
                enableButton: true,

            },
            data: [],
        };
    },
    created() {
        this.getCollaboratorsObjectives();
    },
    methods: {
        async getCollaboratorsObjectives() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisor();
                const items = response.data.result.collaboratorsObjectivesSummary;
                // console.log(response.data.result.collaboratorsObjectivesSummary);
                this.data = [];
                for (let index = 0; index < items.length; index++) {
                    const objectives = [];
                    const objectivesAux = items[index].objectivesSummary;
                    for (let jndex = 0; jndex < objectivesAux.length; jndex++) {
                        objectives.push({
                            key: jndex + 1,
                            status: this.selectStatusName(objectivesAux[jndex].status),
                            objective: {
                                title: objectivesAux[jndex].name,
                            },
                            endDate: objectivesAux[jndex].deliveryDate,
                        });
                    }
                    this.data.push({
                        key: index + 1,
                        name: items[index].collaboratorFullName,
                        number: items[index].collaboratorEmployeeNumber,
                        objectives,
                        totalPendingObjectives: items[index].totalPendingObjectives,
                    });
                }
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
        toggleViewProgressModal() {
            this.viewProgressModal.show = !this.viewProgressModal.show;
        },
        selectTagColor(status) {
            switch (status) {
            case 'No iniciado':
                return 'ant-tag-red';
            case 'En proceso':
                return 'ant-tag-yellow';
            case 'Completado':
                return 'ant-tag-green';
            case 'Validado':
                return 'ant-tag-blue';
            default:
                return 'ant-tag-gray';
            }
        },
        selectStatusName(status) {
            switch (status) {
            case 0:
                return 'No iniciado';
            case 1:
                return 'En proceso';
            case 2:
                return 'Completado';
            case 3:
                return 'Validado';
            }
        },
        objectivesCount(objectives) {
            let completed = 0;
            objectives.forEach((objective) => {
                if (objective.status === 'Completado') {
                    completed += 1;
                }
            });

            return `${completed} de ${objectives.length} objetivos cumplidos`;
        },
        objectivesPercet(objectives) {
            let completed = 0;
            objectives.forEach((objective) => {
                if (objective.status === 'Completado') {
                    completed += 1;
                }
            });
            return (completed * 100) / objectives.length;
        },
        collaboratorImgUrl(employeeNumber) {
            return `${process.env.VUE_APP_PROFILES_IMG_URL}/${employeeNumber}.png`;
        },
    },
};
</script>

<style scoped>

</style>
