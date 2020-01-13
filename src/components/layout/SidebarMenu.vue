<script>
export default {
    name: "sidebar-menu",
    props: {
        menuElements: {
            type: Array,
            required: true,
        },
    },
    render(createElement) {
        const template = this.menuElements.map((item, index) => {
            if (item.subItems) {
                return createElement(
                    "a-sub-menu",
                    {
                        props: {
                            key: String(index),
                        },
                    },
                    [
                        createElement(
                            "span",
                            {
                                slot: "title",
                            },
                            [
                                createElement("a-icon", {
                                    props: { type: item.icon },
                                }),
                                createElement("span", item.text),
                            ],
                        ),
                        item.subItems.map((subItem, subMenuIndex) => {
                            return createElement(
                                "a-menu-item",
                                {
                                    props: {
                                        key: String(subMenuIndex),
                                    },
                                },
                                [
                                    createElement(
                                        "router-link",
                                        {
                                            props: {
                                                to: {
                                                    name: subItem.to,
                                                },
                                            },
                                        },
                                        [
                                            createElement("a-icon", {
                                                props: { type: subItem.icon },
                                            }),
                                            createElement("span", subItem.text),
                                        ],
                                    ),
                                ],
                            );
                        }),
                    ],
                );
            }
            return createElement(
                "a-menu-item",
                {
                    props: {
                        key: String(index),
                    },
                },
                [
                    createElement(
                        "router-link",
                        {
                            props: {
                                to: {
                                    name: item.to,
                                },
                            },
                        },
                        [
                            createElement("a-icon", { props: { type: item.icon } }),
                            createElement("span", item.text),
                        ],
                    ),
                ],
            );
        });

        /* Vue doesn't have a Fragment like element so
         * we must return this items wrapped in `a-menu` component
         */
        return createElement(
            "a-menu",
            {
                props: {
                    mode: "inline",
                },
            },
            template,
        );
    },
};
</script>
