<template>
    <a-col class="form-autoevaluation">
        <a-row class="form-tittle">
            <a-col :span="24">
                <h1>Evaluación de Competencias</h1>
            </a-col>
            <a-col :span="24">
                <a-row class="form-section" :key="section.id" v-for="section in formSections">
                    <a-col :span="24" class="form-section-tittle">
                        <h4>{{section.tittle}}</h4>
                    </a-col>
                    <a-col :span="24">
                        <a-row :key="question.id" v-for="question in section.questions"
                            style="padding: 10px 16px;"
                        >
                            <a-col :span="16" >
                                <span>
                                    {{question.label}}
                                </span>
                            </a-col>
                            <a-col :span="8" >
                                <a-select
                                    placeholder="Seleccione..."
                                    style="width: 100%"
                                    :disabled="onlyLecture"
                                >
                                    <a-select-option
                                        :value="option.value"
                                        :key="option.value"
                                        v-for="option in selectOptions"
                                    >
                                        {{option.label}}
                                    </a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :span="24" style="padding: 10px 15px 20px 15px;">
                        <a-input placeholder="Comentarios" :disabled="onlyLecture"/>
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
            selectOptions: [
                {
                    value: 1,
                    label: 'Insatisfactorio (<70%)',
                },
                {
                    value: 2,
                    label: 'Cumple requerimiento (71% a 99%)',
                },
                {
                    value: 3,
                    label: 'Excede requerimiento (100%)',
                },
            ],
            formSections: [
                {
                    id: 1,
                    tittle: '1. Orientación a resultados',
                    questions: [
                        {
                            id: 1,
                            label: 'Cumple con las funciones de su puesto.',
                        },
                        {
                            id: 2,
                            label: 'Realiza seguimiento a sus alcances.',
                        },
                        {
                            id: 3,
                            label: 'Organiza tareas y realiza planes de acción para el alcance de los objetivos.',
                        },
                        {
                            id: 4,
                            label: 'Respeta y hace respetar tiempos de entrega.',
                        },
                        {
                            id: 5,
                            label: 'Esta comprometido con su trabajo, va mas allá de la descripción de puesto establecida para su cargo.',
                        },
                    ],
                },
                {
                    id: 2,
                    tittle: '2. Eficiencia',
                    questions: [
                        {
                            id: 1,
                            label: 'Se mantiene actualizado respecto a los temas relevantes de su puesto.',
                        },
                        {
                            id: 2,
                            label: 'Demuestra interés para mejorar sus áreas de oportunidad (realiza acciones concretas).',
                        },
                        {
                            id: 3,
                            label: 'Propone actualizaciones periódicas de los procesos a su cargo.',
                        },
                        {
                            id: 4,
                            label: 'Mejoró los indicadores de su área.',
                        },
                        {
                            id: 5,
                            label: 'Busca mayor responsabilidad, se desempeña sin supervisión dando seguimiento a tareas.',
                        },
                    ],
                },
                {
                    id: 3,
                    tittle: '3. Orientación al detalle',
                    questions: [
                        {
                            id: 1,
                            label: 'Distingue lo importante de lo secundario.',
                        },
                        {
                            id: 2,
                            label: 'Verifica las veces que sean necesarias el material a entregar con la finalidad de evitar errores.',
                        },
                        {
                            id: 3,
                            label: 'Esta atento a los pequeños detalles que afectan a su trabajo.',
                        },
                        {
                            id: 4,
                            label: 'Aprende de las experiencias. No repite errores.',
                        },
                        {
                            id: 5,
                            label: 'Procura la mejora continua de su trabajo.',
                        },
                    ],
                },
                {
                    id: 4,
                    tittle: '4. Comunicación ',
                    questions: [
                        {
                            id: 1,
                            label: 'Se comunica con pares y superiores de manera efectiva.',
                        },
                        {
                            id: 2,
                            label: 'Utiliza los canales de comunicación apropiados para cada caso.',
                        },
                        {
                            id: 3,
                            label: 'Contribuye a reuniones constructivas y eficaces.',
                        },
                        {
                            id: 4,
                            label: 'Da, recibe y aprende de la crítica constructiva.',
                        },
                        {
                            id: 5,
                            label: 'Mantiene la confidencialidad de la información que maneja.',
                        },
                    ],
                },
                {
                    id: 5,
                    tittle: '5. Capacidad de análisis y solución de problemas ',
                    questions: [
                        {
                            id: 1,
                            label: 'Sabe detectar futuros problemas, previéndolos de manera oportuna.',
                        },
                        {
                            id: 2,
                            label: 'Realiza seguimiento a sus alcances.',
                        },
                        {
                            id: 3,
                            label: 'Reúne hechos relevantes para entender una situación específica y tomar decisiones sólidas y a tiempo.',
                        },
                        {
                            id: 4,
                            label: 'Participa activamente en la solución de problemas de su departamento.',
                        },
                        {
                            id: 5,
                            label: 'Si el problema que se presenta involucra a más áreas, lo escala y comunica de forma eficiente para la solución del mismo.',
                        },
                    ],
                },
                {
                    id: 6,
                    tittle: '6. Negociación',
                    questions: [
                        {
                            id: 1,
                            label: 'Demuestra habilidades de negociación.',
                        },
                        {
                            id: 2,
                            label: 'Va preparado para una negociación.',
                        },
                        {
                            id: 3,
                            label: 'Cuenta con información relevante (Fortalezas/ Debilidades) de la persona con quien negociará.',
                        },
                        {
                            id: 4,
                            label: 'Predica Ganar-Ganar.',
                        },
                        {
                            id: 5,
                            label: 'Obtiene beneficios importantes para su trabajo y para la organización.',
                        },
                    ],
                },
                {
                    id: 7,
                    tittle: '7. Cultura 3B',
                    questions: [
                        {
                            id: 1,
                            label: 'Conoce y aplica los principios de trabajo de Tiendas 3B.',
                        },
                        {
                            id: 2,
                            label: 'Conoce los objetivos de Tiendas 3B.',
                        },
                        {
                            id: 3,
                            label: 'Elabora alternativas para que su trabajo no se vea afectado. Cuenta con un plan B.',
                        },
                        {
                            id: 4,
                            label: 'Aplica principios de control (objetivos y compromisos).',
                        },
                        {
                            id: 5,
                            label: 'Respeta el plan de carrera y desarrollo.',
                        },
                    ],
                },
            ],
        };
    },
};
</script>

<style scoped>

</style>
