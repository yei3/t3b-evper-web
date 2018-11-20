<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Cierre de mis evaluaciones realizadas por mi jefe
            </a-col>
            <a-col :span="12" style="text-align: right;">
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
        <transition name="fade">
            <a-row class="collapse-content" v-show="!collapsed">
                <a-table :columns="columns" :dataSource="data" :pagination=false>
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
                        <a
                            class="table-link-light"
                            @click="toggleCBEModal()"
                        >
                            Cerrar
                        </a>
                    </span>
                </a-table>
            </a-row>
        </transition>

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
            collapsed: false,
            CBEModal: {
                show: false,
                enableButton: false,
            },
            data: [
                {
                    key: '1',
                    status: 'Pendiente de revisión',
                    evaluation: {
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    reviewDate: '13/07/2017',
                    endDate: '13/07/2017',
                },
            ],
            columns,
        };
    },
    methods: {
        toggleCBEModal() {
            this.CBEModal.show = !this.CBEModal.show;
        },
        selectTagColor(status) {
            if (status === 'No iniciado') {
                return 'ant-tag-red';
            }
            if (status === 'Pendiente') {
                return 'ant-tag-yellow';
            }
            if (status === 'Finalizado') {
                return 'ant-tag-green';
            }
            return 'ant-tag-gray';
        },
    },
};
</script>

<style scoped>

</style>