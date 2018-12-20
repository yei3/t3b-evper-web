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
import { GChart } from 'vue-google-charts';

export default {
    components: {
        GChart,
    },
    data() {
        return {
            chartData: [
                ['name', 'Manager', 'tooltip'],
                [
                    {
                        v: 'Mike',
                        f: '<div class="org-card"> <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png" alt="John" class="org-user-img"> <h2 class="org-user-name">Mike Mison</h2> <p class="org-user-title">CEO & Founder</div>',
                    },
                    '',
                    'The President',
                ],
                [
                    {
                        v: 'Jim',
                        f: '<div class="org-card"> <img src="https://png2.kisspng.com/sh/4617a6c26e05df6ce8fe579da3a6b997/L0KzQYm3VsI3N6Z8i5H0aYP2gLBuTfF3aaVmip9Ac3X1PbT2jgB2fJZ3Rdtsb372PcT2hwR4aaNqRdZudnXvf8Hskr02amQ3T9VsOXPmQYbtV745P2M8SqkDMEG4Q4G3U8U1OGI9S6g3cH7q/kisspng-avatar-user-computer-icons-software-developer-5b327cc9cc15f7.872727801530035401836.png" alt="John" class="org-user-img"> <h2 class="org-user-name">Jim Jimy</h2> <p class="org-user-title">CEO & Founder</div>',
                    },
                    'Mike',
                    'VP',
                ],
                [
                    {
                        v: 'Alice',
                        f: '<div class="org-card"> <img src="https://png2.kisspng.com/sh/4617a6c26e05df6ce8fe579da3a6b997/L0KzQYm3VsI3N6Z8i5H0aYP2gLBuTfF3aaVmip9Ac3X1PbT2jgB2fJZ3Rdtsb372PcT2hwR4aaNqRdZudnXvf8Hskr02amQ3T9VsOXPmQYbtV745P2M8SqkDMEG4Q4G3U8U1OGI9S6g3cH7q/kisspng-avatar-user-computer-icons-software-developer-5b327cc9cc15f7.872727801530035401836.png" alt="John" class="org-user-img"> <h2 class="org-user-name">Alice Alison</h2> <p class="org-user-title">CEO & Founder</div>',
                    },
                    'Mike',
                    '',
                ],
                [
                    {
                        v: 'Bob',
                        f: '<div class="org-card"> <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png" alt="John" class="org-user-img"> <h2 class="org-user-name">Bob Esponge</h2> <p class="org-user-title">CEO & Founder</div>',
                    },
                    'Jim',
                    'Bob Sponge',
                ],
                [
                    {
                        v: 'Carol',
                        f: '<div class="org-card"> <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png" alt="John" class="org-user-img"> <h2 class="org-user-name">Carol Caroline</h2> <p class="org-user-title">CEO & Founder</div>',
                    },
                    'Mike',
                    '',
                ],
            ],
            chartOptions: {
                allowHtml: true,
                nodeClass: 'org-custom-node',
                allowCollapse: true,
            },
        };
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
    font-size: 15px;
}

.org-custom-node {
    background-color: #fbfbfb;
}

.org-user-img {
    width: 50px;
}

.org-user-name {
    font-size: 18px;
}
</style>
