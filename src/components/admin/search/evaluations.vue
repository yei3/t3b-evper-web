<template>
    <div>
        <a-row :gutter="16">
            <a-col :span="4">
                <a-input placeholder="Nombre" />
            </a-col>
            <a-col :span="5">
                <a-input placeholder="Area" />
            </a-col>
            <a-col :span="3">
                <a-input placeholder="Evaluador" />
            </a-col>
            <a-col :span="3">
                <a-input placeholder="Evaluado" />
            </a-col>
            <a-col :span="4">
                <a-date-picker placeholder="Fecha Inicio" />
            </a-col>
            <a-col :span="4">
                <a-date-picker placeholder="Fecha Fin" />
            </a-col>
            <a-col :span="1">
                <a-button shape="circle" icon="search" @click="search" />
            </a-col>
        </a-row>
        <a-row class="collapse-title" style="margin-top: 16px;">
            <a-col :span="12">
                Evaluaciones
            </a-col>
            <a-col :span="12" style="text-align: right;">
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="down"
                        @click="collapsed = !collapsed"
                        v-show="!collapsed"
                    />
                </a>
                <a>
                    <a-icon
                        class="dropdown-icon"
                        type="up"
                        @click="collapsed = !collapsed"
                        v-show="collapsed"
                    />
                </a>
            </a-col>
        </a-row>
        <transition name="fade">
            <a-row class="collapse-content" v-show="!collapsed">
                <a-table :columns="columns" :dataSource="data" :pagination=false>
                    <span slot="status" slot-scope="status">
                        <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                    </span>
                    <span slot="evaluation" slot-scope="evaluation">
                        <p><a class="table-link">
                            {{evaluation.title}}
                        </a></p>
                        <p><small>{{evaluation.subtitle}}</small></p>
                    </span>
                    <span slot="action" slot-scope="text, record">
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item @click="test">
                                    Editar
                                </a-menu-item>
                                <a-menu-item @click="deleteEvaluation(record.key)">
                                    Eliminar
                                </a-menu-item>
                            </a-menu>
                            <a-button class="ant-btn-small">
                                ...
                            </a-button>
                        </a-dropdown>
                    </span>
                </a-table>
            </a-row>
        </transition>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
import client3B from '@/api/client3B';

const columns = [
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
    }, {
        title: 'Evaluación',
        dataIndex: 'evaluation',
        key: 'evaluation',
        scopedSlots: { customRender: 'evaluation' },
    }, {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
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
            collapsed: false,
            data: [],
            columns,
        };
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.search()
    },
    watch: {
        // call again the method if the route changes
        '$route': 'search'
    },
    methods: {
        async deleteEvaluation(id) {
            console.log('delete');
            let response = null;
            console.log('deleteing', id);
            try {
                response = await client3B.evaluation.delete({
                    Id: id,
                });
            } catch (error) {

            }
            await this.search();
        },
        test() {
            console.log('works');
        },
        async search() {
            let items = null;
            let response = null;

            try {
                response = await client3B.evaluation.getAll();
                items = response.data.result.items;
                this.data = [];
                for (let index = 0; index < items.length; index++) {

                    this.data.push({
                        key: items[index].id,
                        status: this.getStatus(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: items[index].description,
                        },
                        endDate: items[index].endDate,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        getStatus(status) {
            switch (status) {
                case 0: return 'No iniciado';
                case 1: return 'Pendiente';
                case 2: return 'Finalizado';
                case 3: return 'Validado';

                default:
                    break;
            }
        },
        transformStatus(status) {
            if (status === 'Pendiente' || status === 'Finalizado') {
                return 'Continuar';
            }
            return 'Iniciar';
        },
        selectTagColor(status) {
            switch (status) {
                case 'No iniciado': return 'ant-tag-red';
                case 'Pendiente': return 'ant-tag-yellow';
                case 'Finalizado': return 'ant-tag-green';
                case 'Validado': return 'ant-tag-blue';

                default:
                    return 'ant-tag-gray';
            }
        },
    },
};
</script>

<style>

</style>
