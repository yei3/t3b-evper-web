<template>
    <a-col :span="24" style="padding: 5px 15px 0px 15px; margin-bottom: 0px;">
        <a-row :gutter="16">
            <a-col :sm="12" :md="3">
                <a-tag :class="tagColorClass">{{objectiveStatus}}</a-tag>
            </a-col>
            <a-col :sm="12" :md="6">
                <strong>{{objective.name}}</strong>
            </a-col>
            <a-col :sm="12" :md="6">
                {{objective.deliverable}}
            </a-col>
            <a-col :sm="12" :md="6">
                {{(new Date(objective.deliveryDate)).toLocaleString()}}
            </a-col>
            <a-col :sm="12" :md="3" style="text-align: right;">
                <a-dropdown>
                    <a-menu slot="overlay">
                        <a-menu-item key="1"
                            :disabled="objective.status === 3"
                            @click="
                                modals.modalRecordProgress.show = true;
                                modals.modalRecordProgress.input = '';
                            "
                        >
                            Registrar avances
                        </a-menu-item>
                        <a-menu-item key="2"
                            @click="modals.modalViewProgress.show = true"
                        >
                            Ver avances
                        </a-menu-item>
                        <a-menu-divider />
                        <a-menu-item key="3" @click="
                            modals.modalFinish.show = true
                            modals.modalFinish.input = ''
                        "
                            :disabled="objective.status === 3"
                        >
                            Completar objetivo
                        </a-menu-item>
                    </a-menu>
                    <a-button class="ant-btn-small">
                        ...
                    </a-button>
                </a-dropdown>
            </a-col>
        </a-row>
        <a-divider style="margin-top: 10px; background: #d5d5d5;"/>
        <!-- Record Progress -->
        <a-modal v-model="modals.modalRecordProgress.show" width="600px" >
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="edit" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Registrar avance</h1>
                        <small>{{objective.name}}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a las acciones realizadas
                        para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24" modal-content-seccion-bottom>
                    <a-textarea
                        placeholder="Avance del objetivo..."
                        :rows="6"
                        v-model="modals.modalRecordProgress.input"
                    />
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button
                    key="back"
                    @click="clearModalRecordProgress"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    @click="saveProgress"
                    :loading="modals.modalRecordProgress.loading"
                    :disabled="
                        modals.modalRecordProgress.input === '' ||
                        modals.modalRecordProgress.loading
                    "
                >
                    Guardar
                </a-button>
            </template>
        </a-modal>
        <!-- View Progress -->
        <a-modal v-model="modals.modalViewProgress.show" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-header" style="margin-top: 25px;">
                        <h1>Ver avances</h1>
                        <small>{{ objective$.name }}</small>
                    </a-col>
                </a-row>
            </template>
            <a-row class="modal-content">
                <a-col :span="24" style="text-align: center;">
                    <span v-if="objective$.binnacle.length === 0">No hay avances</span>
                </a-col>
                <a-col :span="24" style="padding: 0px 20px;">
                    <a-timeline mode="alternate">
                        <a-timeline-item v-for="(item, index) in objective$.binnacle"
                            :key="index"
                            color="gray"
                            class="timeline-item"
                        >
                            <a-icon slot="dot" type="edit" style="font-size: 20px" />
                            <p style="padding-left: 20px; padding-top: 5px">
                                <a-avatar size="small" style="backgroundColor:#87d068" icon="user"/>
                                {{item.username}}
                                <small>{{ item.creationTime }}</small>
                            </p>
                            <p style="padding-left: 20px; padding-top: 5px">
                                {{ item.text }}
                            </p>
                        </a-timeline-item>
                    </a-timeline>
                </a-col>
            </a-row>
            <template slot="footer">
                <a-button key="back"
                    @click="modals.modalViewProgress.show = false"
                >
                    Cerrar
                </a-button>
            </template>
        </a-modal>
        <!-- Finish Objetive -->
        <a-modal v-model="modals.modalFinish.show" width="600px">
            <template slot="title">
                <a-row>
                    <a-col :span="24" class="modal-icon-wrapper">
                        <a-icon type="check-square" class="modal-icon" />
                    </a-col>
                    <a-col :span="24" class="modal-header">
                        <h1>Completar Objetivo</h1>
                        <small>{{objective.name}}</small>
                    </a-col>
                </a-row>
            </template>

            <a-row class="modal-content">
                <a-col :span="24" class="modal-content-seccion-top">
                    <span>
                        Agregue un comentario referente a las acciones
                        realizadas para cumplir el objetivo indicado.
                    </span>
                </a-col>
                <a-col :span="24" class="modal-content-seccion">
                    <a-textarea placeholder="Comentarios..." :rows="6"
                        v-model="modals.modalFinish.input"
                    />
                </a-col>
                <a-col :span="24" class="modal-content-seccion-bottom">
                     ¿Está seguro que desea completar el objetivo indicado?
                </a-col>
            </a-row>

            <template slot="footer">
                <a-button
                    key="back"
                    @click="modals.modalFinish.show = false"
                >
                    Cancelar
                </a-button>
                <a-button
                    class="modal-button-ok"
                    key="submit"
                    type="primary"
                    :loading="modals.modalFinish.loading"
                    :disabled="modals.modalFinish.input === ''"
                    @click="completeObjective"
                >
                    Si, completar objetivo
                </a-button>
            </template>
        </a-modal>
    </a-col>
</template>

<script >
import errorHandler from '@/views/errorHandler';
import client3B from '@/api/client3B';
import authService from '@/services/auth';

export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
        index: {
            type: Number,
            required: true,
        },
        objective: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            objective$: null,
            modals: {
                modalRecordProgress: {
                    show: false,
                    input: '',
                    loading: false,
                },
                modalViewProgress: {
                    show: false,
                    input: '',
                    loading: false,
                },
                modalFinish: {
                    show: false,
                    input: '',
                    loading: false,
                },
            },
        };
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.objective$ = this.objective;
        },
        clearModalRecordProgress() {
            this.modals.modalRecordProgress.show = false;
            this.modals.modalRecordProgress.input = '';
        },
        async saveProgress() {
            this.modals.modalRecordProgress.loading = true;
            const response = await client3B.binnacle.createMessage({
                evaluationQuestionId: this.objective.id,
                text: this.modals.modalRecordProgress.input,
                // creationTime: new Date(),
            }).catch(error => errorHandler(this, error));

            this.modals.modalRecordProgress.loading = false;
            this.modals.modalRecordProgress.show = false;

            if (!response) return;

            this.$message.success('Evaluación guardada correctamente');
            this.objective$.status = 2;
            this.objective$.binnacle.push({
                id: response.data.result.id,
                evaluationQuestionId: response.data.result.evaluationQuestionId,
                text: response.data.result.text,
                creationTime: response.data.result.creationTime,
                username: authService.getUserData().name,
            });
        },
        async completeObjective() {
            this.modals.modalFinish.loading = true;
            const response = await client3B.objective.updateStatus({
                id: this.objective$.id,
                status: 3,
            }).catch(error => errorHandler(this, error));

            this.modals.modalFinish.loading = false;
            if (!response) return;
            this.modals.modalFinish.show = false;
            this.objective$.status = 3;
            this.$message.success('El objetivo se ha completado correctamente');
        },
    },
    computed: {
        tagColorClass() {
            const statuses = {
                0: 'ant-tag-red', // No status
                1: 'ant-tag-red', // No iniciado
                2: 'ant-tag-yellow', // En progreso
                3: 'ant-tag-green', // Completado
                4: 'ant-tag-blue', // Validado
            };

            return statuses[this.objective$.status];
        },
        objectiveStatus() {
            const statuses = {
                0: 'No iniciado',
                1: 'No iniciado',
                2: 'En proceso',
                3: 'Completado',
                4: 'Validado',
            };

            return statuses[this.objective$.status];
        },
    },
};
</script>

<style src="@/assets/styles/evaluationForm.css" scoped></style>
<style scoped>
div >>> .ant-form-item-label {
    text-align: left;
}

div >>> .ant-form-item-required {
    font-size: 15px;
}

div >>> .ant-form-item {
    margin-bottom: 5px;
}

.input-save {
    color: green;
}

.input-save:hover {
    color: #005f00;
    cursor: pointer;
}
</style>
