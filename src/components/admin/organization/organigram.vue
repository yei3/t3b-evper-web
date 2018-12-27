<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :h2="24">
                <h1 class="breadcrumb-header">Crear Formato</h1>
            </a-col>
            <a-col :h2="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-home' }"
                            class="breadcrumb-path"
                        >
                            Organigrama
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >
            <a-row>
                <a-col span="24">
                    <h1>Organigrama</h1>
                </a-col>
                <a-divider />
            </a-row>
            <a-row style="overflow-x: scroll;">
                <a-col span="24">
                    <GChart
                        :settings="{ packages: ['orgchart'] }"
                        type="OrgChart"
                        version="current"
                        :data="chartData"
                        :options="chartOptions"
                    />
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import client3B from '@/api/client3B';
import { GChart } from 'vue-google-charts';
import errorHandler from '@/views/errorHandler';

export default {
    components: {
        GChart,
    },
    data: () => ({
        chartData: null,
        chartOptions: null,        
    }),
    async mounted () {
        this.getOrganigram();
    },
    methods: {
        async getOrganigram() {
            let response = null;
            try {
                response = await client3B.organizationUnit.getOrganigram();
                const items = response.data.result;
                const rrhh = items[6];

                this.chartData = [
                    ['name', 'Manager', 'tooltip'],
                    // [
                    //     {
                    //         v: 'DIRECTOR DE RECURSOS HUMANOS',
                    //         f: `<div class="org-card"><h2 class="org-user-name">Área de Recursos Humanos </h2><p class="org-user-title">RRHH</div>`
                    //     },
                    //     '',
                    //     ''
                    // ],
                ];
                for (let i = 0; i < rrhh.organizationUnitUsers.length; i++) {
                    this.chartData.push(
                    [
                        {
                            v: rrhh.organizationUnitUsers[i].jobDescription,
                            f: `<div class="org-card"> <img src="https://t3b.blob.core.windows.net/t3b/images/profile/`
                                +rrhh.organizationUnitUsers[i].userName+
                                `.png" alt="John" class="org-user-img"> <h3 class="org-user-name">`
                                +rrhh.organizationUnitUsers[i].fullName+
                                `</h3> <p class="org-user-title">`+rrhh.organizationUnitUsers[i].jobDescription+`</div>`,
                        },
                        rrhh.organizationUnitUsers[i].immediateSupervisor,
                        rrhh.organizationUnitUsers[i].fullName,
                        
                    ]
                    );
                }                
                this.chartOptions = {
                    allowHtml: true,
                    nodeClass: 'org-custom-node',
                    allowCollapse: true,
                }                
            } catch (error) {
                
            }
        }
    }
};
</script>

<style>
.org-card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    min-width: 180px;
    margin: auto;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
}

.org-user-title {
    color: grey;
    font-size: 13px;
}

.org-custom-node {
    background-color: #fbfbfb;
}

.org-user-img {
    width: 50px;
}

.org-user-name {
    font-size: 14px;
}
</style>
