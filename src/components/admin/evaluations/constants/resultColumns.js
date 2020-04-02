/**
    result": {
        "totalCount": 9,
        "items": [
          {
            "employeeNumber": "50213",
            "period": "2019-01",
            "successObjectivesPercent": 56.7,
            "exceededRequirementPercent": 82.5,
            "completedRequirementPercent": 45.6,
            "unsatisfactoryRequirementPercent": 33.33,
            "currentObjectivesCount": 8,
            "globalEvaluationsCount": 71.13,
            "id": 1412
          }
        ]
      },
 */

const evaluationResultColumns = [
    {
        title: "Numero de empleado",
        dataIndex: "employeeNumber",
        key: "employeeNumber",
        scopedSlot: { customRender: "collaborator" },
    },
    {
        title: "Periodo",
        dataIndex: "period",
        key: "period",
        scopedSlot: { customRender: "period" },
    },
    {
        title: "% Objetivos logrados",
        dataIndex: "successObjectivesPercent",
        key: "successObjectivesPercent",
        scopedSlot: { customRender: "objectivesPercent" },
    },
    {
        title: "% Excede requerimientos",
        dataIndex: "exceededRequirementPercent",
        key: "exceededRequirementPercent",
        scopedSlot: { customRender: "exceededRequirement" },
    },
    {
        title: "% Cumple requerimientos",
        dataIndex: "completedRequirementPercent",
        key: "completedRequirementPercent",
        scopedSlot: { customRender: "completedRequirement" },
    },
    {
        title: "% Insatisfactorio",
        dataIndex: "unsatisfactoryRequirementPercent",
        key: "unsatisfactoryRequirementPercent",
        scopedSlot: { customRender: "unsatisfactoryRequirement" },
    },
    {
        title: "Numero de objetivos actuales",
        dataIndex: "currentObjectivesCount",
        key: "currentObjectivesCount",
        scopedSlot: { customRender: "objectivesCount" },
    },
    {
        title: "Evaluacion global",
        dataIndex: "globalEvaluationsCount",
        key: "globalEvaluationsCount",
        scopedSlot: { customRender: "globalCount" },
    },
];

export default evaluationResultColumns;
