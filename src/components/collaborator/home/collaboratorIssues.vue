<template>
    <div class="collapse" style="margin-bottom: 35px;" >
        <a-row class="collapse-title background--title">
            <a-col :span="23" style="text-align: center;">
                Acciones por finalizar
            </a-col>
            <a-col :span="1" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-col :span="8" style="padding-right: 6px;">
                <a-badge :count="autoEvaluations" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
                <span class="badged-text">Auto-evaluaciones en proceso</span>
            </a-col>
            <a-col :span="8" style="padding: 0px 3px 0px 3px;">
                <a-badge :count="evaluations" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
                <span class="badged-text">Cierre de mis evaluaciones en proceso</span>
            </a-col>
            <a-col :span="8" style="padding-left: 6px;">
                <a-badge :count="objectives" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
                <span class="badged-text">Objetivos en proceso</span>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

export default {
    data() {
        return {
            collapsed: false,
            spin: false,
            autoEvaluations: 0,
            evaluations: 0,
            objectives: 0,
        };
    },
    created() {
        this.getToDoes();
    },
    methods: {
        async getToDoes() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();

                this.autoEvaluations = response.data.result.toDoesSummary.autoEvaluations;
                this.evaluations = response.data.result.toDoesSummary.evaluations;
                this.objectives = response.data.result.toDoesSummary.objectives;
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
    },
};
</script>

<style scoped>
.collapse-mod {
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f4f6fa;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #676a6c;
}

.badges-collaborator {
    margin-top: 10px;
    margin-bottom: 15px;
}

.badged-text {
    font-weight: 600;
    font-size: 12px;
    color: #777;
    margin-left: 5px;
}
</style>
