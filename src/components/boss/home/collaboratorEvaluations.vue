<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23" class="text-center">
                Cierre de evaluaciones
            </a-col>
            <a-col :span="1" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false>
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p><a
                        class="table-link"
                        @click="toggleFinishEvaluationModal"
                    >
                        {{evaluation.title}}
                    </a></p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="review" slot-scope="review">
                    <!-- <a
                        class="table-link-light"
                        @click="toggleScheduleReviewModal"
                    > -->
                        {{review}}
                    <!-- </a> -->
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-button 
                        size="small"
                        class="btn--close-evaluations"
                        @click="toggleFinishEvaluationModal()"
                        :disabled="disableButton(record.status)"
                    >
                        Cerrar
                    </a-button>
                </span>
            </a-table>
        </a-row>

        <a-modal
            v-model="finishEvaluationModal.show"
            onOk="toggleFinishEvaluationModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Cerrar evaluación</h1>
                        <small>(Nombre de la evaluacion) - (Nombre del colaborador)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente al desempeño,
                        la evaluación y a la retroalimentación recibida del Colaborador.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6"/>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-checkbox @change="
                        finishEvaluationModal.enableButton = !finishEvaluationModal.enableButton
                    ">
                        <strong style="font-size: 13px;">
                            He preparado esta evaluación de desempeño con detenimiento,
                            lo he explicado claramente y discutido en detalle con el colaborador.
                        </strong>
                    </a-checkbox>
                </a-col>
                <a-col class="modal-content-seccion-bottom">
                    <span>
                        ¿Está seguro que desea cerrar la evaluación indicada?
                    </span>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleFinishEvaluationModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    key="submit"
                    type="primary"
                    class="modal-button-ok"
                    @click="toggleFinishEvaluationModal"
                    :disabled="!finishEvaluationModal.enableButton"
                >
                    Si, cerrar evaluación
                </a-button>
            </template>
        </a-modal>

        <a-modal
            v-model="scheduleReviewModal.show"
            onOk="toggleScheduleReviewModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="calendar" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Agendar revisión</h1>
                        <small>(Nombre de la evaluacion) - (Nombre del colaborador)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                         Seleecione la fecha de la revisón:
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-date-picker style="width: 100%" />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                    <span>
                        ¿Está seguro que desea agendar la revisión de la evaluación indicada?
                    </span>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleScheduleReviewModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleScheduleReviewModal"
                >
                    Agendar revisión
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
        title: 'Evaluación',
        dataIndex: 'evaluation',
        key: 'evaluation',
        scopedSlots: { customRender: 'evaluation' },
    }, {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: 'Fecha de revisión',
        key: 'reviewDate',
        dataIndex: 'reviewDate',
        scopedSlots: { customRender: 'review' },
    },
    {
        title: '',
        key: 'action',
        scopedSlots: { customRender: 'action' },
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            columns,
            data: [
                // {
                //     key: '1',
                //     status: 'En revisión',
                //     evaluation: {
                //         title: 'Período 2017-1',
                //         subtitle: 'Evaluación de Desempeño',
                //     },
                //     reviewDate: '13/07/2018',
                //     endDate: '13/07/2017',
                // },
            ],
            scheduleReviewModal: {
                show: false,
                enableButton: false,
            },
            finishEvaluationModal: {
                show: false,
                enableButton: false,
            },            
        };
    },
    created() {
        this.getCollaboratorEvaluations();
    },
    methods: {
        async getCollaboratorEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getSupervisor();
                const items = response.data.result.collaboratorRevisionSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({                        
                        key: index+1,
                        id: items[index].id,
                        status: this.selectStatusName(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: items[index].description
                        },
                        collaborator: items[index].collaboratorName,
                        reviewDate: new Date(items[index].revisionDateTime).toLocaleDateString(),
                        endDate: new Date(items[index].endDateTime).toLocaleDateString(),
                    });
                }                
            } catch (error) {
                console.log(error);
            } finally {
                this.spin = false;
            }
        },
        toggleScheduleReviewModal() {
            this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
        },
        toggleFinishEvaluationModal() {
            this.finishEvaluationModal.show = !this.finishEvaluationModal.show;
        },
        disableButton (status) {
            if (status === 'No iniciado' || status === 'En proceso') {
                return true;
            }
            return false;
        },
        selectTagColor(status) {
            if (status === 'No iniciado') {
                return 'ant-tag-red';
            }
            if (status === 'En proceso') {
                return 'ant-tag-yellow';
            }
            if (status === 'Finalizado') {
                return 'ant-tag-green';
            }
            return 'ant-tag-gray';
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
    },
};
</script>

<style scoped>
    .btn--close-evaluations {
        border: none;
        background: #00d5af;
        color: #000;
        font-size: 11px;
        width: 82px;
    }
    .btn--start-evaluations:hover {
        background: #00af8f;
        color: #fff;
    }
</style>
