<template>
    <div class="collapse" v-show="data.length > 0 ">
        <a-row class="collapse-title background--title">
            <a-col :span="23" style="text-align: center;">
                Cierre de mi evaluación
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
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table :columns="columns" :dataSource="data" :pagination=false
                :scroll="{ x: true }"
            >
                <span slot="status" slot-scope="status">
                    <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                </span>
                <span slot="evaluation" slot-scope="evaluation">
                    <p><a
                        class="table-link"
                        @click="toggleCBEModal()"
                    >
                        {{evaluation.title}}
                    </a></p>
                    <p><small>{{evaluation.subtitle}}</small></p>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a-button
                        size="small"
                        class="btn--close-evaluations"
                        @click="toggleCBEModal()"
                        :disabled="disableButton(record.status)"
                    >
                        Cerrar
                    </a-button>
                </span>
            </a-table>
        </a-row>

        <a-modal
            v-model="CBEModal.show"
            onOk="toggleCBEModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Cerrar Evaluación</h1>
                        <small>(Nombre de la evaluación)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a su evaluación y a la
                        retroalimentación recibida por su Jefe.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6"/>
                </a-col>
                <a-col class="modal-content-seccion">
                    <a-checkbox @change="CBEModal.enableButton = !CBEModal.enableButton">
                        <strong style="font-size: 13px;">
                        He leído y comprendido la evaluación de desempeño realizada por mi Jefe
                        y las recomendaciones señaladas. Haré lo mejor posible para mejorar mi
                        desempeño basado en sus comentarios.</strong>
                    </a-checkbox>
                </a-col>
                <a-col class="modal-content-seccion-bottom">
                    <p>¿Está seguro que desea cerrar la evaluación indicada?</p>
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="toggleCBEModal"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="toggleCBEModal"
                    :disabled="!CBEModal.enableButton"
                >
                    Si, cerrar evaluación
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
            collapsed: true,
            CBEModal: {
                show: false,
                enableButton: false,
            },
            data: [],
            columns,
        };
    },
    created() {
        this.getRevisionSummary();
    },
    methods: {
        async getRevisionSummary() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();
                const items = response.data.result.revisionSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: index + 1,
                        status: this.selectStatusName(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: 'sin descripción',
                        },
                        endDate: new Date(items[index].endDateTime).toLocaleDateString(),
                        reviewDate: new Date(items[index].revisionDateTime).toLocaleString(
                            [],
                            {
                                day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
                            },
                        ),
                    });
                }
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.spin = false;
            }
        },
        toggleCBEModal() {
            this.CBEModal.show = !this.CBEModal.show;
        },
        disableButton(status) {
            if (status === 'No iniciado' || status === 'En proceso') {
                return true;
            }
            return false;
        },
        selectTagColor(status) {
            switch (status) {
            case 'No iniciado':
                return 'ant-tag-red';
            case 'En proceso':
                return 'ant-tag-yellow';
            case 'Finalizado':
                return 'ant-tag-green';
            case 'En revisión':
                return 'ant-tag-blue';
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
                return 'Finalizado';
            case 3:
                return 'En revisión';
            case 4:
                return 'Validado';
            default:
                return 'No iniciado';
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
