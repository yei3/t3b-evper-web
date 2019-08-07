<template>
    <a-col class="results-info" :xl="12" :lg="12" :xs="24">
        <a-row class="custom-row" type="flex" justify="center">
            <a-col v-if="showAll" class="custom-col" :xl="4">
                <p class="custom-col__text custom-col__text--title">Plantilla</p>
                <div class="circle">
                    <span class="text">{{ this.data.totalEmployees }}</span>
                </div>
            </a-col>
            <a-col class="custom-col" :xl="4">
                <p class="custom-col__text custom-col__text--title">Evaluados</p>
                <p class="custom-col__text custom-col__text--percentage">
                    {{ this.getEvaluatedPercentage }}%
                </p>
                <div class="circle">
                    <span class="text">{{ this.data.evaluatedEmployees }}</span>
                </div>
            </a-col>
        </a-row>
        <a-row v-if="showAll" type="flex" justify="center">
            <a-col :xl="6">
                <p class="custom-col__text custom-col__text--average">
                    Promedio de antiguedad: {{ this.getAgeAverage }} años
                </p>
            </a-col>
        </a-row>
    </a-col>
</template>

<script>
export default {
    name: "results-info",
    data: () => ({
        evaluatedAverage: 0,
    }),
    props: {
        data: Object,
        showAll: Boolean,
    },
    computed: {
        getEvaluatedPercentage() {
            const evaluatedPercent =
                (this.$props.data.evaluatedEmployees / this.$props.data.totalEmployees) * 100;
            return evaluatedPercent.toFixed(2);
        },
        getAgeAverage() {
            return this.$props.data.seniorityAverage.toFixed(1);
        },
    },
};
</script>

<style scoped>
.circle {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    background-color: #1890ff;
    border-color: #000;
    border-radius: 50%;
}

.circle .text {
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
}

.custom-col {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.custom-row {
    margin-bottom: 1rem;
}

.custom-col__text {
    flex-basis: 100%;
    text-align: center;
}

.custom-col__text--title {
    font-weight: bold;
    color: #000;
}

.custom-col__text--average {
    color: red;
    font-weight: bold;
}

.custom-col__text--percentage {
    margin: 0.4rem 0;
    font-weight: bold;
}
</style>
