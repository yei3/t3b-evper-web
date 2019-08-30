<template>
<div
    class="collapse-content"
    style="background-color: white;
    margin: 30px 30px; padding-top: 20px;:"
>
    <a-row>
        <a-col :md="11" style="text-align:center;">
            <h4 style="color: red;">Evaluado A</h4>
        </a-col>
        <a-col :md="2" style="text-align:center;">
            <h4 style="color: red;">vs</h4>
        </a-col>
        <a-col :md="11" style="text-align:center;">
            <h4 style="color: red;">Evaluado B</h4>
        </a-col>
    </a-row>
    <a-row v-show="form.loading">
        <div style="text-align: center; margin-top: 20px;">
            <a-spin tip="Cargando filtros de consulta..." />
        </div>
    </a-row>
    <a-row :gutter="16" v-show="!form.loading">
        <a-col :sm="24" :md="12">
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Región:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.left.region"
                    @change="form.left.area = form.left.job = form.left.person = none"
                    :disabled="loading"
                >
                    <a-select-option :value="none" :key="none"
                        >Selecciona una región
                    </a-select-option>
                    <a-select-option
                        v-for="region in regions"
                        :key="region.id"
                        :value="region.id"
                        >{{ region.displayName }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Área:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.left.area"
                    @change="form.left.job = form.left.person = none; getUsersLeft()"
                    :disabled="form.left.region === none || loading"
                >
                    <a-select-option :value="none" :key="none">
                        Selecciona una área
                    </a-select-option>
                    <a-select-option
                        v-for="area in leftAreas"
                        :key="area.id"
                        :value="area.id"
                        >{{ area.displayName }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Puesto:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.left.job"
                    @change="form.left.person = none"
                    :disabled="form.left.area === none || loading"
                >
                    <a-select-option :value="none" :key="none">Todos</a-select-option>
                    <a-select-option
                        v-for="(job, index) in leftJobs"
                        :key="index"
                        :value="job"
                        >{{ job }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Evaluado:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.left.person"
                    showSearch
                    :filterOption="filterOption"
                    :disabled="form.left.job === none || loading"
                >
                    <a-select-option :value="none" :key="none">Todos</a-select-option>
                    <a-select-option
                        v-for="person in leftPeople"
                        :key="person.id"
                        :value="person.id"
                        >{{ person.fullName }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Fecha Inicio:</h5>
                <a-date-picker
                    v-model="form.left.start"
                    placeholder="Fecha Inicio"
                    :disabled="loading"
                />
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Fecha Fin:</h5>
                <a-date-picker
                    v-model="form.left.end"
                    placeholder="Fecha Fin"
                    :disabled="loading"
                />
            </a-col>
        </a-col>
        <a-col :sm="24" :md="12">
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Región:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.right.region"
                    @change="form.right.area = form.right.job = form.right.person = none"
                    :disabled="loading"
                >
                    <a-select-option :value="none" :key="none">
                        Selecciona una región
                    </a-select-option>
                    <a-select-option
                        v-for="region in regions"
                        :key="region.id"
                        :value="region.id"
                        >{{ region.displayName }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Área:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.right.area"
                    @change="form.right.job = form.right.person = none; getUsersRight()"
                    :disabled="form.right.region === none || loading"
                >
                    <a-select-option :value="none" :key="none">
                        Selecciona una área
                    </a-select-option>
                    <a-select-option
                        v-for="area in rightAreas"
                        :key="area.id"
                        :value="area.id"
                        >{{ area.displayName }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Puesto:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.right.job"
                    @change="form.right.person = none"
                    :disabled="form.right.area === none || loading"
                >
                    <a-select-option :value="none" :key="none">Todos</a-select-option>
                    <a-select-option
                        v-for="(job, index) in rightJobs"
                        :key="index"
                        :value="job"
                        >{{ job }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Evaluado:</h5>
                <a-select
                    style="width: 100%"
                    :defaultValue="none"
                    v-model="form.right.person"
                    showSearch
                    :filterOption="filterOption"
                    :disabled="form.right.job === none || loading"
                >
                    <a-select-option :value="none" :key="none">Todos</a-select-option>
                    <a-select-option
                        v-for="person in rightPeople"
                        :key="person.id"
                        :value="person.id"
                        >{{ person.fullName }}</a-select-option
                    >
                </a-select>
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Fecha Inicio:</h5>
                <a-date-picker
                    v-model="form.right.start"
                    placeholder="Fecha Inicio"
                    :disabled="loading"
                />
            </a-col>
            <a-col :sm="24" :md="24" :lg="24" :xl="12">
                <h5>Fecha Fin:</h5>
                <a-date-picker
                    v-model="form.right.end"
                    placeholder="Fecha Fin"
                    :disabled="loading"
                />
            </a-col>
        </a-col>
        <a-col :md="24" style="text-align: center; padding-top: 20px;">
            <a-alert v-show="bannerError" banner closable :message="bannerError" />
            <br />
            <a-button
                type="primary"
                :loading="loading"
                :disabled="loading"
                @click="emitForm"
                >Comparar</a-button
            >
        </a-col>
    </a-row>
</div>
</template>

<script>
import moment from "moment";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";

const NONE = "NONE"; // I don't remeber why we use this fix

export default {
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
    },
    data: () => ({
        none: NONE,
        areas: [],
        regions: [],
        jobs: [],
        usersLeft: [],
        usersRight: [],
        bannerError: null,
        form: {
            loading: false,
            left: {
                region: NONE,
                area: NONE,
                job: NONE,
                person: NONE,
                start: undefined,
                end: undefined,
            },
            right: {
                region: NONE,
                area: NONE,
                job: NONE,
                person: NONE,
                start: undefined,
                end: undefined,
            },
        },
    }),
    created() {
        this.init();
    },
    methods: {
        async init() {
            this.form.loading = true;
            const [
                {
                    data: { result: regions },
                },
                {
                    data: { result: areas },
                },
                {
                    data: { result: jobs },
                },
            ] = await Promise.all([
                client3B.organizationUnit.getAllRegions(),
                client3B.organizationUnit.getAllAreas(),
                client3B.organizationUnit.getAreasJobDescription(),
            ]).catch((error) => errorHandler(this, error));

            this.regions = regions;
            this.areas = areas;
            this.jobs = jobs;
            this.form.loading = false;
        },
        filterOption(input, option) {
            return (
                option.componentOptions.children[0].text
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
            );
        },
        emitForm() {
            this.bannerError = null;
            if (this.form.left.region === NONE || this.form.right.region === NONE) {
                this.bannerError = "Debes seleccionar un región para cada lado del formulario";
                return;
            }
            if (this.form.left.area === NONE || this.form.right.area === NONE) {
                this.bannerError = "Debes seleccionar una área para cada lado del formulario";
                return;
            }
            if (
                this.form.left.start === undefined ||
                this.form.right.start === undefined ||
                this.form.left.end === undefined ||
                this.form.right.end === undefined
            ) {
                this.bannerError = "Selecciona un rango de fechas correcto";
                return;
            }
            const formData = JSON.parse(JSON.stringify(this.form));
            formData.left.start = moment(formData.left.start);
            formData.left.start.set({
                hour: 0, minute: 0, second: 0, millisecond: 0,
            });
            formData.left.end = moment(formData.left.end);
            formData.left.end.set({
                hour: 23, minute: 59, second: 59, millisecond: 999,
            });
            formData.right.start = moment(formData.right.start);
            formData.right.start.set({
                hour: 0, minute: 0, second: 0, millisecond: 0,
            });
            formData.right.end = moment(formData.right.end);
            formData.right.end.set({
                hour: 23, minute: 59, second: 59, millisecond: 999,
            });
            formData.left.isSalesArea = this.isSalesArea(formData.left.area);
            formData.right.isSalesArea = this.isSalesArea(formData.right.area);

            this.$emit("updatedForm", formData);
        },
        isSalesArea(areaId) {
            if (areaId === NONE) return false;

            return this.areas
                .find((area) => area.id === areaId)
                .isSalesArea;
        },
        async getUsers(areaId) {
            const response = await client3B.user.getUsersByArea({ areaId })
                .catch((error) => this.errorHandler(this, error));
            return response.data.result;
        },
        async getUsersLeft() {
            this.usersLeft = await this.getUsers(this.form.left.area);
        },
        async getUsersRight() {
            this.usersRight = await this.getUsers(this.form.right.area);
        },
    },
    computed: {
        leftAreas() {
            if (this.form.left.region === NONE) return [];
            return this.areas.filter((area) => area.parentId === this.form.left.region);
        },
        rightAreas() {
            if (this.form.right.region === NONE) return [];
            return this.areas.filter((area) => area.parentId === this.form.right.region);
        },
        leftJobs() {
            if (this.form.left.area === NONE) return [];
            return this.jobs.find((job) => job.areaId === this.form.left.area).jobDescriptions;
        },
        rightJobs() {
            if (this.form.right.area === NONE) return [];
            return this.jobs.find((job) => job.areaId === this.form.right.area).jobDescriptions;
        },
        rightPeople() {
            const { job } = this.form.right;
            if (job === NONE) return [];
            return this.usersRight.filter((user) => user.jobDescription === job);
        },
        leftPeople() {
            const { job } = this.form.left;
            if (job === NONE) return [];
            return this.usersLeft.filter((user) => user.jobDescription === job);
        },
    },
};
</script>

<style lang="stylus" scoped>

</style>
