<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Crear Evaluación</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }"
                            class="breadcrumb-path"
                        >
                            Administrador de Evaluaciones
                        </router-link>
                    </a-breadcrumb-item>
                    <a-breadcrumb-item>
                        <strong class="breadcrumb-path">Evaluaciones</strong>
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
                <a-col :span="6">
                    <a-select mode="multiple" style="width: 100%" placeholder="Formatos">
                        <a-select-option v-for="item in formats" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select>
                    <!-- <a-select placeholder="Formatos" name="format" v-model="formatSelected" style='width: 256px'>
                        <a-select-option v-for="item in formats" v-bind:value="item.id" :key="item.id">
                            {{ item.name }}
                        </a-select-option>
                    </a-select> -->
                </a-col>
                <a-col :span="5">
                    <a-select mode="multiple" style="width: 100%" placeholder="Regiones">
                        <a-select-option v-for="item in regions" :key="item.id">
                            {{ item.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="5">
                    <a-select mode="multiple" style="width: 100%" placeholder="Areas">
                        <a-select-option v-for="item in areas" :key="item.id">
                            {{ item.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="4">
                    <a-date-picker placeholder="Fecha Inicio" />
                </a-col>
                <a-col :span="4">
                    <a-date-picker placeholder="Fecha Fin" />
                </a-col>
            </a-row>
            <a-row class="text-right" style="padding: 16px 0;">
                <a-button type="primary" ghost @click="applyEvaluation()">
                    Programar <a-icon type="plus" />
                </a-button>
            </a-row>
            <a-row v-show="spin">
                <div style="text-align: center; margin-top: 20px;">
                    <a-spin size="large" />
                </div>
            </a-row>
        </div>        
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
            formatSelected: null,
            regionSelected: null,
            areaSelected: null,
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
        applyEvaluation() {
            this.$router.push({ name: 'admin-evaluations' });
        },
        async getAllFormats() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.format.getAll();                
                this.formats = response.data.result.items;
            } catch (error) {
                console.log(error);
            }
        },
        async getAllRegions() {
            let response = null;
            try {
                response = await client3B.organizationUnit.getAllRegions();
                this.regions = response.data.result;
            } catch (error) {
                console.log(error);
            }
        },
        async getAllAreas() {
            let response = null;
            try {
                response = await client3B.organizationUnit.getAllAreas();
                this.areas = response.data.result;
            } catch (error) {
                console.log(error);
            }
            this.spin = false;
        },
    }    
};
</script>

<style scoped>
    
</style>
