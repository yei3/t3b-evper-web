<template>
    <div class="UserForm">
        <form @submit="handleSubmit">
            <a-row :gutter="24">
                <a-col :span="8">
                    <label for="name">Nombre</label>
                    <a-input id="name" :value="userFormData.name" @change="handleInputChange" />
                </a-col>
                <a-col :span="8">
                    <label for="surname">Apellidos</label>
                    <a-input
                        id="surname"
                        :value="userFormData.surname"
                        @change="handleInputChange"
                    />
                </a-col>
                <!-- Probable I must remove this field -->
                <a-col :span="8">
                    <label for="motherSurname">Apellido materno</label>
                    <a-input id="motherSurname" @change="handleInputChange" />
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="8">
                    <label for="emailAddress">Email</label>
                    <a-input
                        id="emailAddress"
                        :value="userFormData.emailAddress"
                        @change="handleInputChange"
                    />
                </a-col>
                <a-col :span="8">
                    <label for="scholarship">Escolaridad</label>
                    <a-input
                        id="scholarship"
                        :value="userFormData.scholarship"
                        @change="handleInputChange"
                    />
                </a-col>
                <a-col :span="8">
                    <label for="jobDescription">Puesto</label>
                    <a-input
                        id="jobDescription"
                        :value="userFormData.jobDescription"
                        @change="handleInputChange"
                    />
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="8">
                    <label for="region">Región</label>
                    <a-select
                        id="region"
                        :value="userFormData.region"
                        :loading="loadingStates.regionsLoading"
                        @select="handleRegionSelect"
                    >
                        <a-select-option
                            v-for="region in regions"
                            :value="region.code"
                            :key="region.id"
                        >
                            {{ region.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="8">
                    <label for="area">Área</label>
                    <a-select
                        id="area"
                        :value="userFormData.area"
                        :loading="loadingStates.areasLoading"
                        @select="handleAreaSelect"
                    >
                        <a-select-option v-for="area in areas" :value="area.code" :key="area.id">
                            {{ area.displayName }}
                        </a-select-option>
                    </a-select>
                </a-col>
                <a-col :span="8">
                    <label for="immediateSupervisor">Jefe inmediato</label>
                    <a-input id="immediateSupervisor" :value="userFormData.immediateSupervisor" />
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="8">
                    <label for="lastReassignDate">Fecha de última reasignación</label>
                    <a-date-picker
                        class="block"
                        id="lastReassignDate"
                        :value="reassignDateFunction"
                        @change="handleDatePickerChange"
                    />
                </a-col>
                <a-col :span="8">
                    <label for="socialReason">Razón social</label>
                    <a-input
                        id="socialReason"
                        :value="userFormData.socialReason"
                        @change="handleInputChange"
                    />
                </a-col>
                <a-col :span="8">
                    <a-card size="small">
                        <a-row class="mb-0">
                            <a-col class="switch-container" :span="24">
                                <span class="switch-container__label">Perfil jefe</span>
                                <a-switch />
                            </a-col>
                            <a-col class="switch-container" :span="24">
                                <span class="switch-container__label">Perfil administrador</span>
                                <a-switch />
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>
            <a-row class="mb-0" type="flex" justify="end" :gutter="24">
                <a-col class="actions-container" :span="24">
                    <a-button class="actions-container__button" type="default">Cancelar</a-button>
                    <a-button class="actions-container__button" type="default" htmlType="submit"
                        >Guardar cambios</a-button
                    >
                </a-col>
            </a-row>
        </form>
    </div>
</template>

<script>
import moment from "moment";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";
import searchRegion from "@/utils/filter-region";
import { isAdmin, isBoss } from "@/utils/check-permissions";

export default {
    beforeMount() {
        this.userFormData = Object.assign({}, this.$props.userData);
    },
    mounted() {
        this.getAllRegions();
    },
    props: {
        userData: Object,
    },
    data() {
        return {
            userFormData: null,
            userPermissions: {
                isBoss: false,
                isAdmin: false,
            },
            loadingStates: {
                areasLoading: false,
                regionsLoading: false,
            },
            loading: true,
            areas: [],
            regions: [],
            selectedRegionCode: this.$props.userData.region,
        };
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            console.log(this.userFormData);
        },
        handleRegionSelect(value) {
            console.log(value);
            this.selectedRegionCode = value;
            this.userFormData.region = value;
            this.getAllAreasByRegionCode();
        },
        handleAreaSelect(value) {
            console.log(value);
            this.userFormData.area = value;
        },
        handleInputChange({ target }) {
            const { id, value } = target;
            this.userFormData[id] = value;
        },
        handleDatePickerChange(date) {
            if (date) {
                this.userFormData.reassignDate = date;
            } else {
                this.userFormData.reassignDate = this.$props.userData.reassignDate;
            }
        },
        async getAllRegions() {
            try {
                this.loadingStates.regionsLoading = true;
                const regionsResponse = await client3B.organizationUnit.getAllRegions();
                const { data } = regionsResponse;
                const { result } = data;
                const regionCode = searchRegion(this.selectedRegionCode, result);
                this.selectedRegionCode = regionCode;
                this.getAllAreasByRegionCode();
                this.regions = result;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loading = false;
                this.loadingStates.regionsLoading = false;
            }
        },
        async getAllAreasByRegionCode() {
            try {
                this.loadingStates.areasLoading = true;
                const areasResponse = await client3B.organizationUnit.getAllAreasByRegionCode(
                    this.selectedRegionCode,
                );
                const { data } = areasResponse;
                const { result } = data;

                this.areas = result;
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.loadingStates.areasLoading = false;
            }
        },
    },
    computed: {
        reassignDateFunction() {
            return moment(this.userFormData.reassignDate);
        },
    },
};
</script>

<style scoped>
.ant-row {
    margin-bottom: 1rem;
}

.block {
    display: block;
}

.switch-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.switch-container:last-child {
    margin-bottom: 0;
}

.switch-container__label {
    font-weight: 700;
}

.actions-container {
    display: flex;
    justify-content: flex-end;
}

.actions-container__button {
    margin-right: 1rem;
}

.actions-container__button:last-child {
    margin-right: 0;
}

.mb-0 {
    margin-bottom: 0;
}
</style>
