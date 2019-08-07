<template>
    <div class="collapse" v-show="data.length > 0">
        <a-row class="collapse-title background--title">
            <a-col :span="23">
                Seguimiento de acciones
            </a-col>
            <a-col :span="1" style="text-align: right; color: #fff;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="small" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed">
            <a-table
                :columns="columns"
                :dataSource="data"
                :pagination="false"
                :scroll="{ x: true }"
            >
            </a-table>
        </a-row>
    </div>
</template>

<script>
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

const columns = [
    {
        title: "Acción",
        dataIndex: "action",
        key: "action",
        scopedSlots: { customRender: "action" },
    },
    {
        title: "Responsable",
        dataIndex: "responsible",
        key: "responsible",
        scopedSlots: { customRender: "responsible" },
    },
    {
        title: "Fecha compromiso",
        dataIndex: "deliveryDate",
        key: "deliveryDate",
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            loaded: false,
            data: [],
            columns,
            username: "",
        };
    },
    watch: {
        $route: "getCurrentObjectives",
    },
    async created() {
        await this.getCurrentActions();
    },
    methods: {
        async getCurrentActions() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.dashboard.getCollaborator();
                const items = response.data.result.actionSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: index + 1,
                        id: items[index].id,
                        action: items[index].description,
                        responsible: items[index].responsible,
                        deliveryDate: new Date(
                            items[index].deliveryDate + "Z",
                        ).toLocaleDateString(),
                    });
                }
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
    },
};
</script>

<style scoped>
@media only screen and (max-width: 660px) {
    .text-padding {
        text-align: center;
        padding: 0px;
    }
}
</style>
