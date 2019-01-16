<template>
    <div>
        <a-row class="collapse-title" style="margin-top: 0px;">
            <a-col :span="12">
                <h1>Formatos</h1>
            </a-col>
        </a-row>
        <a-row v-show="spin">
            <div style="text-align: center; margin-top: 20px;">
                <a-spin tip="Cargando..." size="large" />
            </div>
        </a-row>
        <a-row class="collapse-content" v-show="!collapsed && !spin">
            <a-table :columns="columns" :dataSource="data" :pagination=false>
                <span slot="action" slot-scope="text, record">
                    <a-dropdown>
                        <a-menu slot="overlay">
                            <a-menu-item>
                                <a @click="gotToEditForm(record.key)">
                                    <a-icon type="edit" />
                                    Editar
                                </a>
                            </a-menu-item>
                            <a-menu-item >
                                <a-popconfirm
                                    title="¿Está seguro de eliminar el Formato de Evaluación?"
                                    @confirm="deleteFormat(record.key)"
                                    okText="SI"
                                    cancelText="No"
                                    class="pop-confirm"
                                >
                                    <a-icon type="delete" />
                                    Eliminar
                                </a-popconfirm>
                            </a-menu-item>
                        </a-menu>
                        <a-button class="ant-btn-small">
                            ...
                        </a-button>
                    </a-dropdown>
                </span>
            </a-table>
        </a-row>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import client3B from '@/api/client3B';
import errorHandler from '@/views/errorHandler';

const columns = [
    {
        title: 'Nombre',
        dataIndex: 'format.title',
        key: 'format.title',
    },
    {
        title: 'Descripción',
        dataIndex: 'format.subtitle',
        key: 'format.subtitle',
    },
    {
        title: '',
        key: 'key',
        scopedSlots: { customRender: 'action' },
        align: 'right',
    },
];

export default {
    data() {
        return {
            spin: false,
            collapsed: false,
            data: [],
            columns,
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.search();
    },
    watch: {
        // call again the method if the route changes
        $route: 'search',
    },
    methods: {
        ...mapActions({
            clearFormatForm: 'clearFormatForm',
        }),
        gotToEditForm(id) {
            this.clearFormatForm();
            this.$router.push({ name: 'update-format', params: { id } });
        },
        async deleteFormat(id) {
            this.spin = true;
            try {
                await client3B.format.delete({
                    Id: id,
                });
            } catch (error) {
                errorHandler(this, error);
            }
            await this.search();
        },
        async search() {
            let response = null;
            this.spin = true;
            try {
                response = await client3B.format.getAll();
                const { items } = response.data.result;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        key: items[index].id,
                        status: this.getStatus(items[index].status),
                        format: {
                            title: items[index].name,
                            subtitle: items[index].description,
                        },
                        endDate: items[index].endDate,
                    });
                }
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        getStatus(status) {
            switch (status) {
            case 0: return 'No iniciado';
            case 1: return 'En proceso';
            case 2: return 'Finalizado';
            case 3: return 'Validado';

            default:
                break;
            }

            return 'No iniciado';
        },
        transformStatus(status) {
            if (status === 'En proceso' || status === 'Finalizado') {
                return 'Continuar';
            }
            return 'Iniciar';
        },
        selectTagColor(status) {
            switch (status) {
            case 'No iniciado': return 'ant-tag-red';
            case 'En proceso': return 'ant-tag-yellow';
            case 'Finalizado': return 'ant-tag-green';
            case 'Validado': return 'ant-tag-blue';

            default:
                return 'ant-tag-gray';
            }
        },
    },
};
</script>

<style scoped>
.pop-confirm:hover {
    color: white;
}
</style>
