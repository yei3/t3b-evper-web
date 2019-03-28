<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Historial de mis evaluaciones</h1>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <div class="collapse-content"
                style="background-color: white;
                margin: 30px 30px;"
            >
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                        <a-input v-model="form.name" placeholder="Nombre de evaluación" />
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                        <a-date-picker placeholder="Fecha Inicio"
                            style="width: 100%"
                            v-model="form.startDate"
                        />
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="8" style="padding-bottom: 15px;">
                        <a-date-picker placeholder="Fecha Fin"
                            style="width: 100%"
                            v-model="form.finishDate"
                        />
                    </a-col>
                    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="4" style="padding-bottom: 15px;">
                        <a-select placeholder="Formato" style="width: 100%"
                            v-model="form.format"
                        >
                            <a-select-option v-for="(item, index) in formats" :key="index"
                                :value="item.id"
                            >
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </a-col>

                    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="4" style="padding-bottom: 15px;">
                        <a-select mode="multiple" style="width: 100%" placeholder="Regiones"
                            v-model="form.regs"
                        >
                            <a-select-option v-for="(item, index) in regions" :key="index"
                                :value="item.id"
                            >
                                {{ item.displayName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="4" style="padding-bottom: 15px;">
                        <a-select mode="multiple" style="width: 100%" placeholder="Áreas"
                            v-model="form.areas"
                        >
                            <a-select-option v-for="(item, index) in areas" :key="index"
                                :value="item.id"
                            >
                                {{ item.displayName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="4" style="padding-bottom: 15px;">
                        <a-select mode="multiple" style="width: 100%" placeholder="Puestos"
                            v-model="form.employments"
                        >
                            <a-select-option v-for="(item, index) in employments" :key="index"
                                :value="item"
                            >
                                {{ item }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="4" style="padding-bottom: 15px;">
                        <a-select mode="multiple" style="width: 100%" placeholder="Empleados"
                            v-model="form.users"
                        >
                            <a-select-option v-for="(item, index) in users" :key="index"
                                :value="item"
                            >
                                {{ item.fullName }}
                            </a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :xs="12" :sm="12" :md="12" :lg="6" :xl="4" class="text-right">
                        <a-button class="btn-green"  @click="findByFilters()" :loading="loading">
                            Consultar
                        </a-button>
                    </a-col>
                </a-row>
            </div>
            <!-- Edit form -->
            <div>
                <a-row v-show="spin">
                    <div style="text-align: center; margin-top: 20px;">
                        <a-spin tip="Cargando..." />
                    </div>
                </a-row>
                <a-row style="margin-top: 30px;">

                    <a-col :span="24">
                        <a-table :columns="columns" :dataSource="data" :pagination=true
                            :scroll="{ x: true }"
                        >
                            <span slot="status" slot-scope="status">
                                <a-tag :class="selectTagColor(status)">{{status}}</a-tag>
                            </span>
                            <span slot="evaluation" slot-scope="evaluation">
                                <p>
                                <strong>
                                {{evaluation.title}}
                                </strong>
                                </p>
                                <p><small>{{evaluation.subtitle}}</small></p>
                            </span>
                            <span slot="action" slot-scope="action, record">
                                <a-button
                                    size="small"
                                    class="btn--start-evaluations"
                                    @click="printEvaluation(record)"
                                    :disabled="disableButton(record.status)"
                                >
                                    Imprimir
                                </a-button>
                                <!-- <router-link
                                    class="table-link-light"
                                    :to="{ name: 'collaborator-assessments-apply' }"
                                >
                                    {{transformStatus(action)}}
                                </router-link> -->
                            </span>
                        </a-table>
                    </a-col>

                </a-row>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import client3B from '@/api/client3B';
import { mapActions, mapGetters } from 'vuex';
import Footer from '@/components/layout/Footer.vue';
import pendingEvaluations from '@/components/collaborator/home/pendingEvaluations.vue';
import errorHandler from '@/views/errorHandler';

const columns = [
    {
        title: 'Estatus',
        dataIndex: 'status',
        key: 'status',
        scopedSlots: { customRender: 'status' },
    },
    {
        title: 'Evaluaciones',
        dataIndex: 'evaluation',
        key: 'evaluation',
        scopedSlots: { customRender: 'evaluation' },
    },
    {
        title: 'Evaluado',
        dataIndex: 'collaborator',
        key: 'collaborator',
        scopedSlots: { customRender: 'collaborator' },
    },
    {
        title: 'Auto',
        dataIndex: 'isAutoevaluation',
        key: 'isAutoevaluation',
        scopedSlots: { customRender: 'isAutoevaluation' },
    },
    {
        title: 'Fecha fin',
        dataIndex: 'endDate',
        key: 'endDate',
    },
    {
        title: '',
        key: 'action',
        dataIndex: 'status',
        scopedSlots: { customRender: 'action' },
        align: 'right',
    },
];

export default {
    components: {
        Footer,
        pendingEvaluations,
    },
    beforeCreate () {
        this.form = this.$form.createForm(this)
    },
    data() {
        return {
            spin: false,
            loading: false,
            data: [],
            users: [],
            regions: [],
            formats: [],
            areas: [],
            employments: [],
            form: {
                name: null,
                format: undefined,
                regs: [],
                areas: [],
                employments: [],
                users: [],
                startDate: null,
                finishDate: null,
            },
            columns,
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getAllUsers();
        this.getAllRegions();
        this.getAllAreas();
        this.getAllFormats();
        this.getAllEmployments();
        this.getAllEvaluations();
    },
    methods: {
        async getAllFormats() {
            const response = await client3B.format.getAll()
                .catch(error => errorHandler(this, error));
            this.formats = response.data.result.items;
        },
        async getAllUsers() {
            let response = null;
            try {
                response = await client3B.user.getAll();
                this.users = response.data.result.items;
            } catch (error) {
                errorHandler(this, error);
            }
        },
        async getAllRegions() {
            const response = await client3B.organizationUnit.getAllRegions()
                .catch(error => errorHandler(this, error));
            this.regions = response.data.result;
        },
        async getAllAreas() {
            const response = await client3B.organizationUnit.getAllAreas()
                .catch(error => errorHandler(this, error));
            this.areas = response.data.result;
        },
        async getAllEmployments() {
            const response = await client3B.user.getAllEmployments()
                .catch(error => errorHandler(this, error));
            this.employments = response.data.result;
        },
        async findbyFilters() {
            this.loading = true;
            const response = await client3B.dashboard.findByFilters({
                name: this.form.name,
                evaluationTemplateId: this.form.format,
                organizationUnitIds: [...this.form.areas, ...this.form.regs],
                jobDescriptions: [...this.form.employments],
                startDate: this.form.startDate,
                endDate: this.form.finishDate,
            }).catch(error => errorHandler(this, error));
            if (response) {
                this.$message.success('Evaluación aplicada correctamente.');
                this.$router.push({ name: 'admin-evaluations' });
            }
            this.loading = false;
        },
        async getAutoEvaluations() {
            let response = null;
            try {
                response = await client3B.dashboard.getEvaluationsHistory();
                const items = response.data.result.evaluationSummary;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        id: items[index].id,
                        key: index + 1,
                        status: this.selectStatusName(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: 'Formato: ' + items[index].description,
                        },
                        collaborator: items[index].collaboratorName,
                        isAutoevaluation: items[index].isAutoEvaluation ? 'Sí' : 'No',
                        endDate: new Date(items[index].endDateTime).toLocaleDateString(),
                    });
                    console.log(items[index]);
                }
                // console.log(this.data);
            } catch (error) {
                errorHandler(this, error);
            }
        },
        async getAllEvaluations() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.evaluation.getAll();
                const items = response.data.result;
                this.data = [];
                for (let index = 0; index < items.length; index += 1) {
                    this.data.push({
                        id: items[index].id,
                        key: index + 1,
                        status: this.selectStatusName(items[index].status),
                        evaluation: {
                            title: items[index].name,
                            subtitle: 'Formato: ' + items[index].template.name,
                        },
                        collaborator: items[index].user.name + ' ' + items[index].user.surname,
                        isAutoevaluation: items[index].template.isAutoEvaluation ? 'Sí' : 'No',
                        endDate: new Date(items[index].endDateTime).toLocaleDateString(),
                    });
                    // console.log(items[index]);
                }
                // console.log(this.data);
            } catch (error) {
                errorHandler(this, error);
            }
            this.spin = false;
        },
        editUser() {
            console.log("OK");
        },
        update() {
            this.loading = true;
        },
        onSearch (value) {
            console.log(value)
        },
        handleSubmit  (e) {
            e.preventDefault()
            this.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                }
                console.log(values);
            })
        },
        disableButton(status) {
            if (status === 'No iniciado' || status === 'En proceso') {
                return true;
            }
            return false;
        },
        transformStatus() {
            return 'Ver';
        },
        selectTagColor(status) {
            switch (status) {
                case 'No iniciado':
                    return 'ant-tag-red';
                case 'En proceso':
                    return 'ant-tag-yellow';
                case 'Finalizado':
                    return 'ant-tag-green';
                case 'Pte. revisión':
                    return 'ant-tag-gray';
                case 'Cerrada':
                    return 'ant-tag-blue';
                default:
                    return 'ant-tag-gray';
            }
        },
        selectStatusName(status) {
            switch (status) {
                case 0:
                    return 'No iniciado';
                case 1:
                    return 'En proceso';
                case 2:
                    return 'Finalizado';
                case 3:
                    return 'Pte. revisión';
                case 4:
                    return 'Cerrada';
                default:
                    return 'No iniciado';
            }
        },
        fillEvaluation(input) {
            console.log(input);
            let id = input.id;
            if (input.isAutoEvaluation === 'Sí' || input.status === 'Pte. revisión' || input.status === 'Cerrada') {
                this.$router.push({ name: 'boss-assessment', params: { id } });
            } else {
                this.$router.push({ name: 'boss-assessments-apply', params: { id } });
            }
        },
        printEvaluation(input) {
            let id = input.id;
            this.$router.push({ name: 'print-assessment', params: { id } });
        },
    },
};
</script>

<style>
    .collapse-content {
        margin: 32px;
        background: white;
    }
</style>
