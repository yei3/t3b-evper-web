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
            <a-col :span="1"></a-col>
            <a-col :span="10">
                <h1>{{ evaluation.name }}</h1>
                <p>{{ evaluation.template.name }}</p>
                <p>{{ evaluation.template.description }}</p>
            </a-col>
            <a-col :span="6">
                <b>Inicio: </b>
                <span style="font-weight: normal">
                    {{ new Date(evaluation.startDateTime).toLocaleDateString() }}
                </span>
                <br>
                <b>Fin: </b>
                <span style="font-weight: normal">
                    {{ new Date(evaluation.endDateTime).toLocaleDateString() }}
                </span>
                <br>
                <br>
                <b style="color: #00b490;">{{ collaboratorName }}</b>
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
                    <div class="subsection--padd">
                        <b
                            class="subsection"
                            v-show="isNullOrEmpty(subsection.name)"                        
                        >
                            {{ subsection.name }}
                        </b>
                    </div>
                    <span
                        :key="h"
                        v-for="(question, h) in subsection.unmeasuredQuestions"
                    >
                        <p class="question__border"><b>{{h+1}}.- </b> <a-icon type="question-circle" /> {{ question.text }}<b></b></p>
                        <p class="question__border">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a-icon type="edit" />&nbsp;{{findAnwer(question.id)}}</p>
                    </span>
                    <span
                        :key="h"
                        v-for="(question, h) in subsection.measuredQuestions"
                    >
                        <p class="question__border">
                            <b>Objetivo: </b>{{ question.text }}
                            <b>Valor esperado: </b> {{question.expected || question.expectedText}}
                            <b>Valor real: </b>
                        </p>
                    </span>
                    <!-- <span
                        :key="h"
                        v-for="(question, h) in subsection.measuredQuestions"
                    >
                        <p class="question__border">{{ question.text }}</p>
                    </span> -->
                </span>
                <a-divider />
            </a-row>
        </div>
        <div class="collapse-content">
            <a-row class="" style="padding: 0 0 8px;">
                <a-col :span="13">
                    <p v-show="isAutoEvaluation">
                        He preparado esta auto evaluación de desempeño con detenimiento, la he explicado claramente y discutido en detalle con mi Evaluador.
                    </p>
                    <p v-show="!isAutoEvaluation">
                        He preparado esta evaluación de desempeño con detenimiento, la he explicado claramente y discutido en detalle con el Evaluado.
                    </p>
                    <br><br>
                    <p v-show="isAutoEvaluation" class="signature"><b>Firma de Evaluado</b></p>
                    <p v-show="!isAutoEvaluation" class="signature"><b>Firma de Evaluador</b></p>
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="6">
                    <br><br>
                    <br><br>
                    <p class="signature"><b>Fecha</b></p>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
            <a-row class="" style="padding: 24px 0 0 0;">
                <a-col :span="13">
                    <p v-show="isAutoEvaluation">
                        He leído y comprendido esta auto evaluación de desempeño, otorgando mis recomendaciones para la mejora en el desempeño del Evaluado.
                    </p>
                    <p v-show="!isAutoEvaluation">
                        He leído y comprendido esta evaluación de desempeño y las recomendaciones señaladas. Haré lo mejor posible para mejorar mi desempeño basado en estos comentarios.
                    </p>
                    <br><br>
                    <p v-show="isAutoEvaluation" class="signature"><b>Firma de Evaluador</b></p>
                    <p v-show="!isAutoEvaluation" class="signature"><b>Firma de Evaluado</b></p>
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="6">
                    <br><br>
                    <br><br>
                    <p class="signature"><b>Fecha</b></p>
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
            isAutoEvaluation: true,
            collaboratorName: '',
            anwsers: [],
            sections: [],
            evaluation: [],
            selectOptions: [
                {
                    value: '-70',
                    label: 'Insatisfactorio (<70%)',
                },
                {
                    value: '71-99',
                    label: 'Cumple requerimiento (71% a 99%)',
                },
                {
                    value: '+100',
                    label: 'Excede requerimiento (100%)',
                },
            ],
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
        findAnwer(questionId) {
            
            let ans = '';
            const regex = "/[\[\]']+/g";
            this.anwsers.forEach( (anwser) => {
                if(anwser.evaluationQuestionId === questionId) {
                    ans = anwser.unmeasuredAnswer.text;
                }
            });
            return (ans !== null) ? ans.replace(regex, '') : '';
        },
        isNullOrEmpty(subsection) {
            return (subsection !== null && subsection !== '' && subsection !== 'Objetivos');
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
            this.collaboratorName = response.data.result.user.name + ' ' + response.data.result.user.surname;
            this.isAutoEvaluation = response.data.result.template.isAutoEvaluation;
            this.sections = response.data.result.template.sections;
            this.anwsers = response.data.result.questions;
        },        
    },
};
</script>

<style scoped>
    .signature {
        text-align: center;
        border-top: solid 1px black;
    }
    .subsection {
        color: #00b490;
        font-size: 15px;
        padding: 1px 8px;
        margin: 0 0 0 20px;
        border-radius: 4px;
        border: 1px solid #adadad
    }
    .subsection--padd {
        padding: 32px 0 16px 0;
    }
    .section__title {
        padding: 0px 8px;
        font-size: 15px;
        border-radius: 3px;
        color: #000000;
        background-color: #6fd1bd;
        text-align: center;
    }
    .question__border {
        margin: 0 0 0 30px;
    }
</style>