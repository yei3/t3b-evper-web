const evaluationResultColumns = [
    {
        title: "Numero de empleado",
        dataIndex: "employeeNumber",
        scopedSlot: { customRender: "collaborator" },
    },
    {
        title: "Periodo",
        dataIndex: "period",
        scopedSlot: { customRender: "period" },
    },
    {
        title: "% Objetivos logrados",
        dataIndex: "successObjectivesPercent",
        scopedSlot: { customRender: "objectivesPercent" },
    },
    {
        title: "% Excede requerimientos",
        dataIndex: "exceededRequirementPercent",
        scopedSlot: { customRender: "exceededRequirement" },
    },
    {
        title: "% Cumple requerimientos",
        dataIndex: "completedRequirementPercent",
        scopedSlot: { customRender: "completedRequirement" },
    },
    {
        title: "% Insatisfactorio",
        dataIndex: "unsatisfactoryRequirementPercent",
        scopedSlot: { customRender: "unsatisfactoryRequirement" },
    },
    {
        title: "Numero de objetivos actuales",
        dataIndex: "currentObjectivesCount",
        scopedSlot: { customRender: "objectivesCount" },
    },
    {
        title: "Evaluacion global",
        dataIndex: "globalEvaluationsCount",
        scopedSlot: { customRender: "globalCount" },
    },
];

export default evaluationResultColumns;
