const getTagColor = (status) => {
    switch (status) {
        case 1:
            return "ant-tag-yellow";
        case 2:
            return "ant-tag-green";
        case 3:
            return "ant-tag-blue";
        case 4:
            return "ant-tag-gray";
        default:
            return "ant-tag-red";
    }
};

export default getTagColor;
