<template>
    <div class="collapse">
        <a-row class="collapse-title">
            <a-col :span="12">
                Autoevaluaciones En procesos
            </a-col>
            <a-col :span="4" style="text-align: right;">
                <router-link class="collapse-tittle-link" to="/foo">Ver resultados</router-link>
                <a>
                    <a-icon type="down" @click="collapsed = !collapsed" v-show="!collapsed"/>
                </a>
                <a>
                    <a-icon type="up" @click="collapsed = !collapsed" v-show="collapsed"/>
                </a>
            </a-col>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-col :span="24">
                <a-tabs type="card">
                    <a-tab-pane tab="1. Objetivos" key="1">
                        <objetives :onlyLecture="true" />
                    </a-tab-pane>
                    <a-tab-pane tab="2. Competencias" key="2">
                        <competences :onlyLecture="true" />
                    </a-tab-pane>
                    <a-tab-pane tab="3. Fortalezas" key="3">
                        <strengths :onlyLecture="true" />
                    </a-tab-pane>
                    <a-tab-pane tab="4. Áreas de mejora" key="4">
                        <improvement-areas :onlyLecture="true" />
                    </a-tab-pane>
                    <a-tab-pane tab="5. Plan Desarrollo" key="5">
                        <development-plan :onlyLecture="true" />
                    </a-tab-pane>
                    <a-tab-pane tab="6. Prox Objetivos" key="6">
                        <next-objetives :onlyLecture="true" />
                    </a-tab-pane>
                </a-tabs>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import objetives from '@/components/boss/performanceEvaluation/objetives.vue';
import competences from '@/components/boss/performanceEvaluation/competences.vue';
import strengths from '@/components/boss/performanceEvaluation/strengths.vue';
import improvementAreas from '@/components/boss/performanceEvaluation/improvementAreas.vue';
import developmentPlan from '@/components/boss/performanceEvaluation/developmentPlan.vue';
import nextObjetives from '@/components/boss/performanceEvaluation/nextObjetives.vue';

export default {
    components: {
        objetives,
        competences,
        strengths,
        improvementAreas,
        developmentPlan,
        nextObjetives,
    },
    data() {
        return {
            collapsed: false,
        };
    },
};
</script>

<style lang="scss" scoped>
.ant-tabs-tab {
    color: #676a6c;
}
.ant-tabs.ant-tabs-card >>> .ant-tabs-bar .ant-tabs-tab-active {
    color: #676a6c;
}
</style>
