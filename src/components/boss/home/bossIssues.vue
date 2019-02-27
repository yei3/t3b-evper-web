<template>
    <div class="collapse">
        <a-row class="collapse-title-boss">
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
            <a-col :span="12">
                <a-badge :count="pendingEvaluations" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
                <span class="badged-text">
                    Evaluaciones de colaboradores en proceso
                </span>
            </a-col>
            <a-col :span="12">
                <a-badge :count="objectivesValidationPending"
                    :numberStyle= "{backgroundColor: '#f8ac59'}"
                />
                <span class="badged-text">
                    Validación de objetivos de colaboradores en proceso
                </span>
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
            pendingEvaluations: 0,
            objectivesValidationPending: 0,
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
                response = await client3B.dashboard.getSupervisor();

                this.pendingEvaluations = response
                    .data
                    .result
                    .supervisorToDoes
                    .collaboratorsPendingEvaluations;
                this.objectivesValidationPending = response
                    .data
                    .result
                    .supervisorToDoes
                    .collaboratorsObjectivesValidationPending;
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
    background-color: darkblue;
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f4f6fa;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #fff;
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
