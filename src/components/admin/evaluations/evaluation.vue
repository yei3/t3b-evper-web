<template>
    <div>
        <a-row :gutter="32" class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Crear Evaluación</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-evaluations' }" class="breadcrumb-path">
                            Evaluaciones
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active" v-if="!$route.params.id">
                            Crear Evaluación
                        </strong>
                        <strong class="breadcrumb-path-active" v-else>
                            Actualizar Evaluación
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content" style="background-color: white; margin: 30px 30px">
            <a-row class="collapse-title" style="margin: 16px 0">
                <a-col :span="24">
                    <h2>Programar nueva Evaluación</h2>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-input v-model="form.name" placeholder="Nombre" />
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-date-picker
                        placeholder="Fecha Inicio"
                        style="width: 100%"
                        v-model="form.startDate"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-date-picker
                        placeholder="Fecha Fin"
                        style="width: 100%"
                        v-model="form.finishDate"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-select placeholder="Formato" style="width: 100%" v-model="form.format">
                        <a-select-option
                            v-for="(item, index) in formats"
                            :key="index"
                            :value="item.id"
                        >
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-col>

                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-select
                        :options="regions"
                        :loading="loadingRegions"
                        :disabled="loadingRegions"
                        mode="multiple"
                        style="width: 100%"
                        placeholder="Regiones"
                        v-model="form.regs"
                        optionFilterProp="title"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-select
                        :options="areas"
                        :loading="loadingAreas"
                        :disabled="loadingAreas"
                        mode="multiple"
                        style="width: 100%"
                        placeholder="Áreas"
                        v-model="form.areas"
                        optionFilterProp="title"
                    />
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px">
                    <a-select
                        mode="multiple"
                        style="width: 100%"
                        placeholder="Puestos"
                        v-model="form.employments"
                    >
                        <a-select-option
                            v-for="(item, index) in employments"
                            :key="index"
                            :value="item"
                        >
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row class="text-right" style="padding: 16px 0">
                <a-popconfirm
                    title="Recordatorio: Recuerda programar la autoevaluación de desempeño antes que la evaluación de desempeño para la correcta creación de los objetivos."
                    @confirm="applyEvaluation()"
                    okText="Confirmar"
                    cancelText="Cancelar"
                >
                    <a-button class="btn-green" :loading="isProcessing" :disabled="isProcessing">
                        <span>Programar</span>
                        <a-icon v-show="!isProcessing" type="schedule" />
                    </a-button>
                </a-popconfirm>
            </a-row>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

export default {
    data() {
        return {
            data: [],
            formats: [],
            employments: [],
            form: {
                name: null,
                format: undefined,
                regs: [],
                areas: [],
                employments: [],
                startDate: null,
                finishDate: null,
            },
            isProcessing: false,
        };
    },
    mounted() {
        this.getAllFormats();
        this.getRegions();
        this.getAreas();
        this.getAllEmployments();
    },
    methods: {
        async getAllFormats() {
            try {
                this.requestStart();
                const response = await client3B.format.getAll();
                this.formats = response.data.result.items;
            } catch (error) {
                this.requestError({ errors: error.message });
                errorHandler(this, error);
            } finally {
                this.requestEnd();
            }
        },
        getRegions() {
            this.getRegionsAsync();
        },
        getAreas() {
            this.getAllAreas();
        },
        async getAllEmployments() {
            try {
                this.requestStart();
                const response = await client3B.user.getAllEmployments();
                this.employments = response.data.result;
            } catch (error) {
                this.requestError({ errors: error.message });
                errorHandler(this, error);
            } finally {
                this.requestEnd();
            }
        },
        async applyEvaluation() {
            this.isProcessing = true;
            try {
                const response = await client3B.evaluation.apply({
                    name: this.form.name,
                    evaluationTemplateId: this.form.format,
                    organizationUnitIds: [...this.form.areas, ...this.form.regs],
                    jobDescriptions: [...this.form.employments],
                    startDate: this.form.startDate,
                    endDate: this.form.finishDate,
                });
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.isProcessing = false;
            }

            if (response) {
                this.$message.success("Evaluación aplicada correctamente.");
                this.$router.push({ name: "admin-evaluations" });
            }
        },
        //* TODO: Rename `getRegionsAsync` method
        ...mapActions(["getAllAreas", "getRegionsAsync"]),
        ...mapMutations(["requestStart", "requestEnd", "requestError"]),
        isButtonDisabled() {
            return true;
        },
    },
    computed: {
        ...mapGetters(["areas", "regions", "loadingRegions", "loadingAreas", "loading"]),
    },
};
</script>

<style scoped></style>
