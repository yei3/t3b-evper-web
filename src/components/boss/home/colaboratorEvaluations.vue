<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Cierre de las evaluaciones de Colaboradores
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <a>
                    <a-icon type="down" @click="collapsed = !collapsed" v-show="!collapsed"/>
                </a>
                <a>
                    <a-icon type="up" @click="collapsed = !collapsed" v-show="collapsed"/>
                </a>
            </a-col>
        </a-row>
        <transition name="fade">
            <a-row class="collapse-content" v-show="!collapsed">
                <a-table :columns="columns" :dataSource="data" :pagination=false>
                    <span slot="status" slot-scope="status">
                        <a-tag color="red">{{status}}</a-tag>
                    </span>
                    <span slot="evaluation" slot-scope="evaluation">
                        <p><a @click="toggleFinishEvaluationModal">
                            {{evaluation.title}}
                        </a></p>
                        <p><small>{{evaluation.subtitle}}</small></p>
                    </span>
                    <span slot="review" slot-scope="review">
                        <a @click="toggleScheduleReviewModal">
                            {{review}}
                        </a>
                    </span>
                    <span slot="action" slot-scope="text, record">
                        <a @click="toggleFinishEvaluationModal">Cerrar</a>
                    </span>
                </a-table>
            </a-row>
        </transition>

        <a-modal
            v-model="finishEvaluationModal.show"
            onOk="toggleFinishEvaluationModal"
            width="600px"
        >
            <template slot="title">
                <a-row>
                    <a-col :span="24">
                        <h1>Cerrar evaluación</h1>
                    </a-col>
                    <a-col :span="24">
                        <small>(Nombre de la evaluacion) - (Nombre del colaborador)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row>
                <a-col :span="24">
                    <span>
                        Agregue un comentario referente al desempeño,
                        la evaluación y a la retroalimentación recibida del Colaborador.
                    </span>
                </a-col>
                <a-col :span="24">
                    <a-textarea placeholder="Comentarios..." :rows="6"/>
                </a-col>
                <a-col :span="24">
                     <a-checkbox @change="finishEvaluationModal.enableButton = !finishEvaluationModal.enableButton">
                        He preparado esta evaluación de desempeño con detenimiento,
                        lo he explicado claramente y discutido en detalle con el colaborador.
                    </a-checkbox>
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
                    <a-col :span="24">
                        <h1>Agendar revisión</h1>
                    </a-col>
                    <a-col :span="24">
                        <small>(Nombre de la evaluacion) - (Nombre del colaborador)</small>
                    </a-col>
                </a-row>
            </template>

            <a-row>
                <a-col :span="24">
                    <span>
                         Seleecione la fecha de la revisón:
                    </span>
                </a-col>
                <a-col :span="24">
                    <a-date-picker style="width: 100%" />
                </a-col>
                <a-col :span="24">
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
            scheduleReviewModal: {
                show: false,
                enableButton: false,
            },
            finishEvaluationModal: {
                show: false,
                enableButton: true,
            },
            collapsed: false,
            data: [
                {
                    key: '1',
                    status: 'Pendiente de revisión',
                    evaluation: {
                        title: 'Período 2017-1',
                        subtitle: 'Evaluación de Desempeño',
                    },
                    reviewDate: '13/07/2018',
                    endDate: '13/07/2017',
                },
            ],
            columns,
        };
    },
    methods: {
        toggleScheduleReviewModal() {
            this.scheduleReviewModal.show = !this.scheduleReviewModal.show;
        },
        toggleFinishEvaluationModal() {
            this.finishEvaluationModal.show = !this.finishEvaluationModal.show;
        },
    },
};
</script>

<style scoped>

</style>
