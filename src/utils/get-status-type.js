const getStatusType = (status) => {
    switch (status) {
        case 1:
            return "En proceso";
        case 2:
            return "Finalizada";
        case 3:
            return "Cerrada";
        case 4:
            return "Pte. revisión";
        default:
            return "No iniciada";
    }
};

export default getStatusType;
