<template>
    <div
        class="collapse-content"
        v-if="readyLeft && readyRight"
        style="background-color: white; margin: 30px 30px;"
    >
        <h3 class="breadcrumb-header">Información de evaluados</h3>
        <a-row>
            <employee-information :queryData="filterForm.left || {}" @ready="componentsready +=1"/>
            <employee-information :queryData="filterForm.right || {}" @ready="componentsready +=1"/>
        </a-row>
    </div>
</template>

<script>
import EmployeeInformation from "@/components/boss/reports/reportsEmployeeInformation.vue";

export default {
    components: {
        EmployeeInformation,
    },
    props: {
        filterForm: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        readyLeft: true,
        readyRight: true,
        componentsready: 0,
    }),
    watch: {
        filterForm: {
            handler() {
                this.componentsready = 0;
            },
            deep: true,
        },
        componentsready(value) {
            if (value === 2) {
                this.$emit("ready", true);
            }
        },
    },
};
</script>
