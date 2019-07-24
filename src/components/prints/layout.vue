<template>
    <div
        id="printEvaluation"
        class="collapse-content"
        style="background-color: white;
        margin: 30px 30px;"
    >
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-title" style="margin: 16px 0;">
            <a-col :span="3">
                <a-avatar :size="120" :src="logoImgUrl()" />
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="10">
                <h1>{{ evaluation.name }}</h1>
                <b>Región:</b>
                <span style="font-weight: normal">{{ region }}</span>
                <br />
                <b>Área:</b>
                <span style="font-weight: normal">{{ area }}</span>
                <br />
                <b>Puesto:</b>
                <span style="font-weight: normal">{{ jobDescription }}</span>
                <br />
                <b>Tiempo en el puesto:</b>
                <span style="font-weight: normal">{{
                    getDiffDates(formatDate(entryDate), formatDate(reassignDate), formatDate(reviewDate))
                }}</span>
                <br />
                <b>Fecha de ingreso:</b>
                <span style="font-weight: normal">{{ formatDate(entryDate) }}</span>
                <br />
                <b>Fecha de revisión:</b>
                <span style="font-weight: normal">{{ formatDate(reviewDate) }}</span>
                <br />
            </a-col>
            <a-col :span="6" v-show="includePastObjectives">
                <h3 style="color: #00b490;">{{ collaboratorName }}</h3>
                <br />
                <b>% Objetivos logrados:</b>
                <span style="font-weight: normal">&emsp;&emsp;{{ completed }}</span>
                <br />
                <b>% Excede requerimiento:</b>
                <span style="font-weight: normal">&emsp;{{ answerER }}</span>
                <br />
                <b>% Cumple requerimiento:</b>
                <span style="font-weight: normal">&emsp;{{ answerCR }}</span>
                <br />
                <b>% Insatisfactorio:</b>
                <span style="font-weight: normal">&emsp;&emsp;{{ answerIN }}</span>
            </a-col>
            <a-col :span="6" v-show="!includePastObjectives">
                <h3 style="color: #00b490;">{{ collaboratorName }}</h3>
                <br />
                <br />
                <b>Evaluación Global:</b>
                <span v-if="evaluationLoaded" style="font-weight: normal"> &emsp;&emsp;{{ getGlobalResult() }} </span>
            </a-col>
            <a-col :span="3">
                <a-button class="btn-blue" @click="print"> <a-icon type="printer" />Imprimir </a-button>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <h2>Instrucciones</h2>
            <p>{{ evaluation.template.instructions }}</p>
            <br />
            <br />
            <a-row v-if="includePastObjectives">
                <div class="section__title">
                    <h3>Objetivos</h3>
                </div>
                <span v-for="(objective, i) in currentObjectives.objectives" :key="i">
                    <p class="question__border">
                        <b>{{ i + 1 }}.-</b>
                        <strong>{{ objective.text }} - {{ getStatusText(objective.status) }}</strong>
                    </p>
                    <p class="question__border">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a-icon type="edit" />
                        &nbsp;
                        {{ objective.notEvaluableAnswer.text }}
                    </p>
                    <p class="question__border">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a-icon type="calendar" />
                        &nbsp;
                        {{ formatDate(objective.notEvaluableAnswer.commitmentTime) }}
                    </p>
                </span>
            </a-row>
            <a-row v-for="(section, i) in sections" :key="i">
                <div class="section__title">
                    <h3>{{ section.name }}</h3>
                </div>
                <span v-for="(subsection, j) in section.childSections" :key="j">
                    <div class="subsection--padd">
                        <b class="subsection" v-show="isNullOrEmpty(subsection.name)">{{ subsection.name }}</b>
                    </div>
                    <span :key="h" v-for="(question, h) in subsection.unmeasuredQuestions">
                        <p class="question__border">
                            <b>{{ h + 1 }}.-</b>
                            <strong>{{ question.text }}</strong>
                        </p>
                        <p class="question__border">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <a-icon type="edit" />
                            &nbsp;
                            {{ findAnswer(question.id) }}
                        </p>
                    </span>
                    <span :key="h" v-for="(question, h) in subsection.measuredQuestions">
                        <p class="question__border">
                            <b>{{ h + 1 }}.- </b>
                            <a-icon type="form" />
                            <br />
                            <b>Objetivo {{ getAccomplished(question) }}:</b>
                            {{ question.text }}
                            <br />
                            <b>Valor esperado:</b>
                            {{ getExpectedQuestion(question) }}
                            <a-icon type="minus" />
                            <b> Valor real:</b>
                            {{ getRealValue(question.id, question.relation) }}
                            <br />
                            <b>Observaciones: </b>
                            {{ getObservaciones(question.id) }}
                        </p>
                    </span>
                    <span :key="h" v-for="(question, h) in subsection.notEvaluableAnswer">
                        <p class="question__border">{{ question.text }}</p>
                    </span>
                </span>
                <a-divider />
            </a-row>
            <a-row v-show="includePastObjectives">
                <div class="section__title">
                    <h3>Próximos Objetivos</h3>
                </div>
                <span v-for="(objective, i) in nextObjectives.objectives" :key="i">
                    <p class="question__border">
                        <b>{{ i + 1 }}.-</b>
                        <strong>{{ objective.text }}</strong>
                    </p>
                    <p class="question__border">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a-icon type="edit" />
                        &nbsp;
                        {{ objective.notEvaluableAnswer.text }}
                    </p>
                    <p class="question__border">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a-icon type="calendar" />
                        &nbsp;
                        {{ objective.notEvaluableAnswer.commitmentTime }}
                    </p>
                </span>
            </a-row>
            <a-row v-show="isClosed">
                <div class="section__title">
                    <h3>Comentario de cierre</h3>
                </div>
                <span>
                    <p class="question__border">{{ evaluation.closingComment }}</p>
                </span>
            </a-row>
        </div>
        <div class="collapse-content">
            <a-row class style="padding: 0 0 8px;">
                <a-col :span="13">
                    <p v-show="isAutoEvaluation">
                        He preparado esta auto evaluación de desempeño con detenimiento, la he explicado claramente y
                        discutido en detalle con mi Evaluador.
                    </p>
                    <p v-show="!isAutoEvaluation">
                        He preparado esta evaluación de desempeño con detenimiento, la he explicado claramente y
                        discutido en detalle con el Evaluado.
                    </p>
                    <br />
                    <br />
                    <p v-show="isAutoEvaluation" class="signature">
                        <b>Firma de Evaluado</b>
                    </p>
                    <p v-show="!isAutoEvaluation" class="signature">
                        <b>Firma de Evaluador</b>
                    </p>
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="6">
                    <br />
                    <br />
                    <br />
                    <br />
                    <p class="signature">
                        <b>Fecha</b>
                    </p>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
            <a-row class style="padding: 24px 0 0 0;">
                <a-col :span="13">
                    <p v-show="isAutoEvaluation">
                        He leído y comprendido esta auto evaluación de desempeño, otorgando mis recomendaciones para la
                        mejora en el desempeño del Evaluado.
                    </p>
                    <p v-show="!isAutoEvaluation">
                        He leído y comprendido esta evaluación de desempeño y las recomendaciones señaladas. Haré lo
                        mejor posible para mejorar mi desempeño basado en estos comentarios.
                    </p>
                    <br />
                    <br />
                    <p v-show="isAutoEvaluation" class="signature">
                        <b>Firma de Evaluador</b>
                    </p>
                    <p v-show="!isAutoEvaluation" class="signature">
                        <b>Firma de Evaluado</b>
                    </p>
                </a-col>
                <a-col :span="4"></a-col>
                <a-col :span="6">
                    <br />
                    <br />
                    <br />
                    <br />
                    <p class="signature">
                        <b>Fecha</b>
                    </p>
                </a-col>
                <a-col :span="1"></a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import print from "@/modules/mixin/print";
import errorHandler from "@/views/errorHandler";

export default {
    mixins: [print],
    components: {},
    data() {
        return {
            spin: false,
            loading: false,
            collapsed: false,
            region: "",
            area: "",
            jobDescription: "",
            reviewDate: "",
            entryDate: "",
            reassignDate: "",
            collaboratorName: "",
            textEG: "",
            isAutoEvaluation: true,
            includePastObjectives: false,
            isClosed: false,
            completed: "",
            objectiveAccomplished: 0,
            answerER: 0,
            answerCR: 0,
            answerIN: 0,
            answerEG: 0,
            answers: [],
            sections: [],
            evaluation: {
                template: {
                    name: "",
                    description: "",
                    instructions: "",
                },
            },
            evaluationLoaded: false,
            nextObjectives: {
                sectionId: 0,
                objectives: [],
            },
            currentObjectives: {
                sectionId: 0,
                objectives: [],
            },
            selectOptions: [
                {
                    value: "-70",
                    label: "Insatisfactorio (<70%)",
                },
                {
                    value: "71-99",
                    label: "Cumple requerimiento (71% a 99%)",
                },
                {
                    value: "+100",
                    label: "Excede requerimiento (100%)",
                },
            ],
        };
    },
    async created() {
        await this.fetchEvaluation();
        // eliminar estas dos llamadas de aqui @omar
        await this.objectivesCount();
        await this.answersCount();
    },
    methods: {
        print() {
            // Pass the element id here
            this.$printEvaluation("printEvaluation");
        },
        findAnswer(questionId) {
            let ans = "";
            const regex = "/[[]']+/g";
            this.answers.forEach((answer) => {
                if (answer.evaluationQuestionId === questionId) {
                    if (answer.unmeasuredAnswer.action === "true") {
                        ans = `Sí. ${answer.unmeasuredAnswer.text}`;
                    } else if (answer.unmeasuredAnswer.action === "false") {
                        ans = `No. ${answer.unmeasuredAnswer.text}`;
                    } else if (answer.unmeasuredAnswer.action === null) {
                        ans = answer.unmeasuredAnswer.text;
                    } else {
                        ans = `ACCIÓN: ${answer.unmeasuredAnswer.action}  |   RESPONSABLE: ${
                            answer.unmeasuredAnswer.text
                        }        FECHA COMPROMISO: ${this.formatDate(answer.unmeasuredAnswer.commitmentDate)}`;
                    }
                }
            });
            ans = ans !== null ? ans.replace(regex, "") : "";
            if (ans === "-70") {
                ans = "Insatisfactorio";
            } else if (ans === "71-99") {
                ans = "Cumple requerimiento";
            } else if (ans === "+100") {
                ans = "Excede requerimiento";
            }
            return ans;
        },
        getRealValue(questionId, relation) {
            let res = "";
            this.answers.forEach((answer) => {
                if (answer.evaluationQuestionId === questionId) {
                    if (relation == 3) {
                        res = answer.measuredAnswer.text;
                    } else {
                        res = answer.measuredAnswer.real;
                    }
                }
            });
            return res;
        },
        getObservaciones(questionId) {
            let res = "";
            this.answers.forEach((answer) => {
                if (answer.evaluationQuestionId === questionId) {
                    res = answer.measuredAnswer.observations;
                }
            });
            return res;
        },
        getExpectedQuestion(question) {
            let res = question.expected || question.expectedText;
            this.answers.forEach((answer) => {
                if (answer.evaluationQuestionId === question.id) {
                    if (answer.measuredAnswer.evaluationMeasuredQuestion.expected === 0) {
                        res = answer.measuredAnswer.evaluationMeasuredQuestion.expected;
                    } else {
                        res =
                            answer.measuredAnswer.evaluationMeasuredQuestion.expected ||
                            answer.measuredAnswer.evaluationMeasuredQuestion.expectedText;
                    }
                }
            });

            return res;
        },
        getAccomplished(question) {
            return this.isObjetiveAccomplished(question) ? "Cumplido" : "No cumplido";
        },
        isQuestionAccomplished(question) {
            const answer = this.answers
                .map((answer) => {
                    if (answer.evaluationQuestionId === question.id) return answer;
                })
                .filter(Boolean)[0];

            return answer.unmeasuredAnswer.action === "true";
        },
        isObjetiveAccomplished(question) {
            let expected = question.expected || question.expectedText;

            const answer = this.answers
                .map((answer) => {
                    if (answer.evaluationQuestionId === question.id) return answer;
                })
                .filter(Boolean)[0];

            if (answer.measuredAnswer.evaluationMeasuredQuestion.expected === 0) {
                expected = answer.measuredAnswer.evaluationMeasuredQuestion.expected;
            } else {
                expected =
                    answer.measuredAnswer.evaluationMeasuredQuestion.expected ||
                    answer.measuredAnswer.evaluationMeasuredQuestion.expectedText;
            }
            switch (question.relation) {
                case 1:
                    return answer.measuredAnswer.real < expected;
                case 2:
                    return answer.measuredAnswer.real <= expected;
                case 3:
                    return answer.measuredAnswer.text === expected;
                case 4:
                    return answer.measuredAnswer.real > expected;
                case 5:
                    return answer.measuredAnswer.real >= expected;
                default:
                    return answer.isActive === false;
            }
            return false;
        },
        getGlobalResult() {
            let result = 0.0;
            const evaluableSections = this.sections
                .map((section) => {
                    if (section.value > 0) return section;
                })
                .filter(Boolean);

            evaluableSections.forEach((section) => {
                if (section.name === "Objetivos evaluados") {
                    let accomplished = 0;
                    section.childSections[0].measuredQuestions.forEach((question) => {
                        if (this.isObjetiveAccomplished(question)) accomplished++;
                    });
                    result += (accomplished / section.childSections[0].measuredQuestions.length) * section.value;
                } else {
                    let accomplished = 0;
                    section.childSections[0].unmeasuredQuestions.forEach((question) => {
                        if (this.isQuestionAccomplished(question)) accomplished++;
                    });
                    result += (accomplished / section.childSections[0].unmeasuredQuestions.length) * section.value;
                }
            });
            return `${result.toFixed(2)} %`;
        },
        clearSections(sections) {
            this.sections = [];
            this.nextObjectives.objectives = [];
            this.currentObjectives.objectives = [];
            sections.forEach((section) => {
                if (this.isObjectiveSection(section)) {
                    this.sections.push(section);
                }
            });
            this.answers.forEach((answer) => {
                if (answer.notEvaluableAnswer !== null) {
                    if (answer.sectionId === this.nextObjectives.sectionId) {
                        this.nextObjectives.objectives.push(answer);
                    }
                    if (answer.sectionId === this.currentObjectives.sectionId) {
                        this.currentObjectives.objectives.push(answer);
                    }
                }
            });
        },
        isNullOrEmpty(subsection) {
            return subsection !== null && subsection !== "";
        },
        isObjectiveSection(section) {
            if (section.name === "Objetivos") {
                this.currentObjectives.sectionId = section.childSections[0].id;
            } else if (section.name === "Próximos Objetivos") {
                this.nextObjectives.sectionId = section.childSections[0].id;
            }
            return section.name !== "Próximos Objetivos" && section.name !== "Objetivos";
        },
        objectivesCount() {
            this.completed = 0;
            let count = 0;
            this.currentObjectives.objectives.forEach((objective) => {
                if (objective.status === 4) {
                    count += 1;
                }
            });
            if (count > 0) {
                this.completed = (count * 100) / this.currentObjectives.objectives.length;
                this.completed = `${this.completed.toPrecision(4)}  %`;
            }
        },
        answersCount() {
            // neta??? 9 variables?
            this.answerER = 0;
            this.answerCR = 0;
            this.answerIN = 0;
            this.answerEG = 0;
            let total = 0;
            let countER = 0;
            let countCR = 0;
            let countIN = 0;
            let countEG = 0;
            this.answers.forEach((answer) => {
                if (answer.unmeasuredAnswer != null) {
                    if (answer.unmeasuredAnswer.text === "-70") {
                        countIN += 1;
                        total += 1;
                    } else if (answer.unmeasuredAnswer.text === "71-99") {
                        countCR += 1;
                        total += 1;
                    } else if (answer.unmeasuredAnswer.text === "+100") {
                        countER += 1;
                        total += 1;
                    } else if (answer.unmeasuredAnswer.action != null) {
                        total += 1;
                        if (answer.unmeasuredAnswer.action === "true") {
                            countEG += 1;
                        }
                    }
                }
            });
            if (countIN > 0) {
                this.answerIN = (countIN * 100) / total;
                this.answerIN = `${this.answerIN.toPrecision(4)}  %`;
            }
            if (countCR > 0) {
                this.answerCR = (countCR * 100) / total;
                this.answerCR = `${this.answerCR.toPrecision(4)}  %`;
            }
            if (countCR > 0) {
                this.answerER = (countER * 100) / total;
                this.answerER = `${this.answerER.toPrecision(4)}  %`;
            }
            if (countEG > 0) {
                this.answerEG = (countEG * 100) / total;
                this.answerEG = `${this.answerEG.toPrecision(4)}`;
                this.textEG = `${this.answerEG} %   ${
                    this.answerEG < 70 ? "Insatisfactorio" : this.answerEG < 90 ? "Satistactorio" : "Excelente"
                }`;
            }
        },
        getStatusText(status) {
            let res = "";
            if (status === 1) {
                res = "No iniciado";
            } else if (status === 2) {
                res = "En proceso";
            } else if (status === 3) {
                res = "Completado";
            } else if (status === 4) {
                res = "Validado";
            }
            return res;
        },
        formatDate(date) {
            // Date tiene metodos para hacerte esto
            let res = `${date} `; // esto para que ?
            if (res.length > 10) {
                res = res.substring(0, 10);
            }
            return res;
        },
        getDiffDates(entry, reassign, review) {
            const fecha1 = new Date(entry);
            let fecha2 = new Date();
            if (reassign === "0001-01-01") {
                fecha2 = fecha1;
            } else {
                fecha2 = new Date(reassign);
            }
            const resta = new Date(review).getTime() - fecha2.getTime();
            const dias = Math.round(resta / (1000 * 60 * 60 * 24));
            const anios = dias / 365;
            const meses = (dias - Math.trunc(anios) * 365) / 30.4;
            const numDias = dias - Math.trunc(anios) * 365 - Math.trunc(meses) * 30.4;
            return `${Math.floor(anios)} años ${Math.floor(meses)} meses ${numDias.toFixed(0)} días.`;
        },
        logoImgUrl() {
            return `${process.env.VUE_APP_IMAGES_URL}/site/logo.png`;
        },
        async fetchEvaluation() {
            this.spin = true;
            const response = await client3B.evaluation.get(this.$route.params.id).catch((error) => {
                this.spin = false;
                errorHandler(this, error);
            });
            if (!response) return;
            this.evaluationLoaded = true;
            this.evaluation = response.data.result;
            this.answers = this.evaluation.questions;
            this.region = this.evaluation.user.region;
            this.area = this.evaluation.user.area;
            this.jobDescription = this.evaluation.user.jobDescription;
            this.reviewDate = this.evaluation.endDateTime;
            this.entryDate = this.evaluation.user.entryDate;
            this.reassignDate = this.evaluation.user.reassignDate;
            this.collaboratorName = `${this.evaluation.user.name}  ${this.evaluation.user.surname}`;
            this.isAutoEvaluation = this.evaluation.template.isAutoEvaluation;
            this.includePastObjectives = this.evaluation.template.includePastObjectives;
            this.isClosed = this.evaluation.closingComment != null && this.evaluation.closingComment.length > 0;
            await this.clearSections(this.evaluation.template.sections);
            this.spin = false;
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
    border: 1px solid #adadad;
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
