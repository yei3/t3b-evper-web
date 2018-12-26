<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Crear Evaluación</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-evaluations' }"
                            class="breadcrumb-path"
                        >
                            Evaluaciones
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path-active"
                            v-if="!$route.params.id"
                        >
                            Crear Evaluación
                        </strong>
                        <strong class="breadcrumb-path-active" v-else>
                            Actualizar Evaluación
                        </strong>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row class="collapse-title" style="margin: 16px 0;">
                <a-col :span="24">
                    Programar nueva Evaluación
                </a-col>

            </a-row>
            <a-row :gutter="16">

                <a-col :span="8">
                    <a-input v-model="form.name" placeholder="Nombre" />
                </a-col>

                <a-col :span="8" style="padding-bottom: 15px;">
                    <a-select placeholder="Please select" style="width: 100%"
                        v-model="form.format"
                    >
                        <a-select-option v-for="(item, index) in formats" :key="index"
                            :value="item.id"
                        >
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                </a-col>

                <a-col :span="8" style="padding-bottom: 15px;">
                    <a-select mode="multiple" style="width: 100%" placeholder="Regions"
                        v-model="form.regs"
                    >
                        <a-select-option v-for="(item, index) in regions" :key="index"
                            :value="item.id"
                        >
                            {{ item.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="8" style="padding-bottom: 15px;">
                    <a-select mode="multiple" style="width: 100%" placeholder="Areas"
                        v-model="form.areas"
                    >
                        <a-select-option v-for="(item, index) in areas" :key="index"
                            :value="item.id"
                        >
                            {{ item.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="8" style="padding-bottom: 15px;">
                    <a-date-picker placeholder="Fecha Inicio"
                        style="width: 100%"
                        v-model="form.startDate"
                    />
                </a-col>
                <a-col :span="8" style="padding-bottom: 15px;">
                    <a-date-picker placeholder="Fecha Fin"
                        style="width: 100%"
                        v-model="form.finishDate"
                    />
                </a-col>
            </a-row>
            <a-row class="text-right" style="padding: 16px 0;">
                <a-button class="btn-green" @click="applyEvaluation()">
                    Programar <a-icon type="plus" />
                </a-button>
            </a-row>
            <a-row v-show="spin">
                <div style="text-align: center; margin-top: 20px;">
                    <a-spin tip="Cargando..." />
                </div>
            </a-row>
        </div>
    </div>
</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    data() {
        return {
            spin: false,
            data: [],
            formats: [],
            regions: [],
            areas: [],
            form: {
                name: null,
                format: null,
                regs: [],
                areas: [],
                startDate: null,
                finishDate: null,
            },
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getAllFormats();
        this.getAllRegions();
        this.getAllAreas();
    },
    components: {

    },
    methods: {
        async getAllFormats() {
            this.spin = true;
            const response = await client3B.format.getAll()
                .catch(error => errorHandler(this, error));
            this.formats = response.data.result.items;
        },
        async getAllRegions() {
            const response = await client3B.organizationUnit.getAllRegions()
                .catch(error => errorHandler(this, error));
            this.regions = response.data.result;
        },
        async getAllAreas() {
            const response = await client3B.organizationUnit.getAllAreas()
                .catch(error => errorHandler(this, error));
            this.areas = response.data.result;
            this.spin = false;
        },
        async applyEvaluation() {
            const response = await client3B.evaluation.apply({
                name: this.form.name,
                evaluationTemplateId: this.form.format,
                organizationUnitIds: [...this.form.areas, ...this.form.regs],
                startDate: this.form.startDate,
                endDate: this.form.finishDate,
            }).catch(error => errorHandler(this, error));
            if (response) {
                this.$message.success('Evaluación aplicada correctamente.');
                this.$router.push({ name: 'admin-evaluations' });
            }
        },
    },
};
</script>

<style scoped>

</style>
