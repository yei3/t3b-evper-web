<template>
    <div class="collapse-content" style="background-color: white; margin: 30px 30px;">
        <h3 class="breadcrumb-header">Reportes de resultados de evaluaciones</h3>
        <a-divider />
        <a-row type="flex" justify="center" :gutter="8">
            <a-col :span="8">
                <a-range-picker
                    :showTime="true"
                    :placeholder="pickerPlaceholders"
                    :format="RANGE_PICKER_FORMAT"
                />
            </a-col>
            <a-col>
                <a-button class="ml-2" :loading="false">
                    <a-icon type="file" />
                    <span>Generar Excel con resultados</span>
                </a-button>
            </a-col>
            <a-button class="ml-2" type="primary" icon="download">Descargar Excel</a-button>
        </a-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pickerPlaceholders: ["Fecha inicial", "Fecha final"],
            RANGE_PICKER_FORMAT: "YYYY-DD-MM, HH:mm:ss",
        };
    },
};
</script>

<styles scoped>
</styles>
