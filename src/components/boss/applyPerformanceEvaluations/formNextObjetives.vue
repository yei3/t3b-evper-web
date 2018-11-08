<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Objetivos para el próximo periodo</h1>
            </a-col>
            <a-col :span="24" style="padding: 0px 16px;">
                <a-row :key="i" v-for="i in formOptions.objetivesForms">
                    <a-col :span="24" style="margin: 10px 0px;">
                        <span>Objetivo {{i}}</span>
                    </a-col>
                    <a-col :span="12">
                        <div style="padding-right: 10px;">
                            <a-input
                                placeholder="Objetivo: Específico/Medible/Alcanzable/Real"
                                :disabled="onlyLecture"
                            />
                        </div>

                    </a-col>
                    <a-col :span="6">
                        <div style="padding: 0px 10px;">
                            <a-input
                                placeholder="Entregable"
                                :disabled="onlyLecture"
                            />
                        </div>
                    </a-col>
                    <a-col :span="6">
                        <div style="padding-left: 10px;">
                            <a-date-picker
                                style="width: 100%"
                                :disabled="onlyLecture"
                            />
                        </div>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    props: {
        onlyLecture: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            formOptions: {
                objetivesForms: 5,
            },
        };
    },
};
</script>

<style scoped>

</style>
