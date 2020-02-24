/*
 * Username (employeeNumber :shrug)
 * Nombre de la evaluaci'on
 * Si es AED o ED (Tipo)
 * ID Evaluaci'on
 * Status
 * Acciones
 */

const evaluationsReportColumns = [
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        scopedSlots: { customRender: "status" },
    },
    {
        title: "Colaborador",
        dataIndex: "employeeNumber",
        key: "employeeNumber",
        scopedSlots: { customRender: "collaborator" },
    },
    {
        title: "Evaluacion",
        dataIndex: "evaluationName",
        key: "evaluationName",
        scopedSlots: { customRender: "evaluation" },
    },
    {
        title: "ID Evaluacion",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Acciones",
        scopedSlots: { customRender: "actions" },
    },
];

export default evaluationsReportColumns;
