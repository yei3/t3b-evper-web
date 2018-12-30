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
                <div class="collapse" v-show="spin" style="text-align: center; padding: 50px;">
                    <a-spin tip="Cargando..." size="large" />
                </div>
                <a-col span="24" v-show="!spin">
                    <GChart
                        :settings="{ packages: ['orgchart'] }"
                        type="OrgChart"
                        version="current"
                        @ready="onChartReady"
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
    data() {
        return {
            spin: true,
        };
    },
    mounted() {
        this.spin = true;
    },
    methods: {
        async onChartReady(chart, google) {
            const response = await client3B.organizationUnit.getOrganigram()
                .catch(error => errorHandler(this, error));
            if (!response) return;

            const data = new google.visualization.DataTable();
            data.addColumn('string', 'name');
            data.addColumn('string', 'manager');
            data.addColumn('string', 'tooltip');

            const items = response.data.result;
            items.forEach((area) => {
                area.organizationUnitUsers.forEach((user) => {
                    data.addRows([
                        [
                            {
                                v: user.jobDescription,
                                f: `<div class="org-card"> <img src="${process.env.VUE_APP_PROFILES_IMG_URL}/${user.userName}.png" alt="John" class="org-user-img"> <h3 class="org-user-name"> ${user.fullName} </h3> <p class="org-user-title"> ${user.jobDescription} </div>`,
                            },
                            user.immediateSupervisor,
                            user.fullName,
                        ],
                    ]);
                });
            });

            chart.draw(data, {
                allowHtml: true,
                nodeClass: 'org-custom-node',
                allowCollapse: true,
            });
            this.spin = false;
        },
    },
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
