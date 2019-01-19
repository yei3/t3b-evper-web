<template>
    <div id="printEvaluation" class="collapse-content"
        style="background-color: white;
        margin: 30px 30px;"
    >
        <a-row class="collapse-title" style="margin: 16px 0;">
            <a-col :span="3">
                <a-avatar
                    :size="120"
                    src="https://t3b.blob.core.windows.net/t3b/images/site/logo.png"
                />
            </a-col>
            <a-col :span="12">
                <h1>{{ evaluation.name }}</h1>
                <p>{{ evaluation.template.name }}</p>
                <p>{{ evaluation.template.description }}</p>
            </a-col>
            <a-col :span="5">
                <b>Inicio: </b> <span style="font-weight: normal">
                    {{ new Date(evaluation.startDateTime).toLocaleDateString() }}
                </span>
                <br>
                <b>Fin: </b> <span style="font-weight: normal">
                    {{ new Date(evaluation.endDateTime).toLocaleDateString() }}
                </span>
            </a-col>
            <a-col :span="3">
                <a-button class="btn-blue"
                    @click="print"
                >
                    <a-icon type="printer" />
                    Imprimir
                </a-button>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <h2>Instrucciones</h2>
            <p>{{ evaluation.template.instructions }}</p>
            <br><br>
            <a-row
                v-for="(section, i) in sections" :key="i"
            >
                <div class="section__title">
                    <h3>{{ section.name }}</h3>
                </div>
                <span
                    v-for="(subsection, j) in section.childSections" :key="j"
                >
                    <h4 class="left-padd__subsection">{{ subsection.name }}</h4>
                    <span
                        :key="h"
                        v-for="(question, h) in subsection.unmeasuredQuestions"
                    >
                        <p class="left-padd__question"><b>Pregunta: </b>{{ question.text }}</p>
                        <p class="left-padd__question"><b>Respuesta: </b> </p>
                    </span>
                    <span
                        :key="h"
                        v-for="(question, h) in subsection.measuredQuestions"
                    >
                        <p class="left-padd__question">
                            <b>Objetivo: </b>{{ question.text }}
                            <b>Valor esperado: </b> {{question.expected || question.expectedText}}
                            <b>Valor real: </b>
                        </p>
                    </span>
                    <!-- <span
                        :key="h"
                        v-for="(question, h) in subsection.measuredQuestions"
                    >
                        <p class="left-padd__question">{{ question.text }}</p>
                    </span> -->
                </span>
                <a-divider />
            </a-row>
        </div>
        <div class="collapse-content">
            <a-row class="" style="padding: 0 0 8px;">
                <a-col :span="13">
                    <p>
                        He leído y comprendido esta evaluación de desempeño
                        y las recomendaciones señaladas.
                    </p>
                    <p>
                        Haré lo mejor posible para mejorar mi desempeño
                        basado en estos comentarios.
                    </p>
                    <br><br>
                    <p class="signature">Nombre y firma del Evaluado</p>
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="6">
                    <br><br>
                    <br><br>
                    <p class="signature">Fecha</p>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
            <a-row class="" style="padding: 24px 0 0 0;">
                <a-col :span="13">
                    <p>He preparado esta evaluación de desempeño con detenimiento, lo he </p>
                    <p>explicado claramente y discutido en detalle con el colaborador.</p>
                    <br><br>
                    <p class="signature">Nombre y firma del eEvaluador</p>
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="6">
                    <br><br>
                    <br><br>
                    <p class="signature">Fecha</p>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
        </div>
    </div>
</template>

<script>

import client3B from '@/api/client3B';
import print from '@/modules/mixin/print';
import errorHandler from '@/views/errorHandler';

export default {
    mixins: [print],
    components: {
    },
    data() {
        return {
            spin: false,
            loading: false,
            collapsed: false,
            sections: [],
            evaluation: [],

        };
    },
    async created() {
        await this.fetchEvaluation();
    },
    methods: {
        print() {
            // Pass the element id here
            this.$printHtml('printEvaluation');
        },
        async fetchEvaluation() {
            this.spin = true;
            const response = await client3B.evaluation.get(this.$route.params.id)
                .catch((error) => {
                    this.spin = false;
                    errorHandler(this, error);
                });
            if (!response) return;
            this.spin = false;
            this.evaluation = response.data.result;
            this.sections = response.data.result.template.sections;
        },
    },
};
</script>

<style scoped>
    .signature {
        text-align: center;
        border-top: solid 1px black;
    }
    .section__title {
        padding: 0px 8px;
        border-radius: 2px;
        background-color: #6fd1bd;
    }
    .left-padd__subsection {
        margin: 0 0 0 24px;
    }
    .left-padd__question {
        margin: 0 0 0 48px;
    }
</style>
