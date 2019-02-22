<template>
    <div>
        <a-row :gutter="32"  class="breadcrumb-wrapper">
            <a-col :h2="24">
                <h1 class="breadcrumb-header">Resultados de Evaluación | Análisis Comparativo</h1>
            </a-col>
            <a-col :h2="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'admin-reports' }"
                            class="breadcrumb-path"
                        >
                            Resultados
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px; padding-top: 20px;:"
        >
            <a-row :gutter="16">
                <a-col :sm="24" :md="4" :lg="2">
                    <strong>Izquierda</strong>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>Periodo: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>N1: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>N2: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>N3: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
            <a-row :gutter="16" style="margin-top: 20px;">
                <a-col :sm="24" :md="4" :lg="2">
                    <strong>Derecha</strong>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>Periodo: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>N1: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
                <a-col :sm="24" :md="5">
                    <span>N2: </span>
                    <a-select style="width: 80%" >
                        <a-select-option value="jack">Jack</a-select-option>
                        <a-select-option value="lucy">Lucy</a-select-option>
                    </a-select>
                </a-col>
            </a-row>
        </div>

        <div class="collapse-content"
            style="background-color: white;
            margin: 30px 30px;"
        >

        </div>
    </div>
</template>

<script>

export default {
};
</script>

<style scoped>
</style>
