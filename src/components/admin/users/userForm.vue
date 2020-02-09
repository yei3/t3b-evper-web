<template>
    <div class="UserForm">
        <form @submit="handleSubmit">
            <a-row type="flex" justify="center" :gutter="24">
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
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
                <a-col :span="8">
                    <label for="jobDescription">Puesto</label>
                    <a-input
                        id="jobDescription"
                        :value="userFormData.jobDescription"
                        @change="handleInputChange"
                    />
                </a-col>
                <a-col :span="8">
                    <label for="immediateSupervisor">Jefe inmediato</label>
                    <a-input
                        id="immediateSupervisor"
                        :value="userFormData.immediateSupervisor"
                        @change="handleInputChange"
                    />
                </a-col>
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
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
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
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
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
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
                    <a-card size="small">
                        <a-row class="mb-0">
                            <a-col class="switch-container" :span="24">
                                <span class="switch-container__label">Perfil jefe</span>
                                <a-switch
                                    id="isBoss"
                                    :checked="isUserBoss"
                                    @click="handleBossSwitchChange"
                                />
                            </a-col>
                            <a-col class="switch-container" :span="24">
                                <span class="switch-container__label">Perfil administrador</span>
                                <a-switch
                                    id="isAdmin"
                                    :checked="isUserAdmin"
                                    @click="handleAdminSwitchChange"
                                />
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>
            <a-row class="mb-0" type="flex" justify="center" :gutter="24">
                <a-col class="actions-container" :span="16">
                    <a-button
                        class="actions-container__button"
                        icon="save"
                        type="primary"
                        htmlType="submit"
                        :loading="isSavingUserData"
                        :ghost="true"
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
import successHandler from "@/views/successHandler";
import searchRegion from "@/utils/filter-region";
import { isAdmin, isSupervisor } from "@/utils/check-permissions";

export default {
    beforeMount() {
        /**
         * We can't and shouldn't directly modify the props
         * here we make a copy of the props to modify them later
         */
        this.userFormData = Object.assign({}, this.$props.userData);
    },
    mounted() {
        this.getAllRegions();
    },
    props: {
        userData: Object,
        isFetchingUser: Boolean,
    },
    watch: {
        userData(newVal) {
            this.userFormData = newVal;
        },
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
            isSavingUserData: false,
            areas: [],
            regions: [],
            selectedRegionCode: this.$props.userData.region,
        };
    },
    methods: {
        handleSubmit(e) {
            const {
                userName,
                name,
                surname,
                emailAddress,
                scholarship,
                isActive,
                lastLoginTime,
                creationTime,
                permissions: roleNames,
                immediateSupervisor,
                id,
            } = this.userFormData;

            const data = {
                userName,
                name,
                surname,
                emailAddress,
                fullName: `${name} ${surname}`,
                isActive,
                lastLoginTime,
                creationTime,
                roleNames,
                scholarship,
                organizationUnits: [],
                id,
            };

            const organizationUnit = this.buildOrganizationUnit(
                immediateSupervisor,
                userName,
                id,
                data,
            );

            data.organizationUnits.push(organizationUnit);

            e.preventDefault();
            this.updateUser(data);
        },
        handleRegionSelect(value) {
            this.selectedRegionCode = value;
            this.userFormData.region = value;
            this.getAllAreasByRegionCode();
        },
        handleAreaSelect(value) {
            this.userFormData.area = value;
        },
        handleInputChange({ target }) {
            const { id, value } = target;
            this.userFormData[id] = value;
        },
        handleDatePickerChange(date) {
            if (date) {
                this.userFormData.reassignDate = new Date(date).toISOString();
            } else {
                this.userFormData.reassignDate = this.$props.userData.reassignDate;
            }
        },
        handleBossSwitchChange(checked) {
            if (!this.userFormData.permissions && checked) {
                this.userFormData.permissions = ["SUPERVISOR"];
            } else if (checked) {
                this.userFormData.permissions.push("SUPERVISOR");
            } else {
                this.removePermission("SUPERVISOR");
            }
        },
        handleAdminSwitchChange(checked) {
            if (!this.userFormData.permissions && checked) {
                this.userFormData.permissions = ["ADMINISTRATOR"];
            } else if (checked) {
                this.userFormData.permissions.push("ADMINISTRATOR");
            } else {
                this.removePermission("ADMINISTRATOR");
            }
        },
        removePermission(permissionName) {
            const { permissions } = this.userFormData;
            const permissionIndex = permissions.findIndex(
                (permission) => permission === permissionName,
            );
            permissions.splice(permissionIndex, 1);
        },
        getSelectedOrganizationUnit() {
            const [selectedArea] = this.areas.filter(
                (area) =>
                    area.code === this.userFormData.area ||
                    area.displayName === this.userFormData.area,
            );
            return selectedArea;
        },
        buildOrganizationUnit(immediateSupervisor, userName, userId, { fullName }) {
            const organizationUnitUsers = [];
            const organizationUnitUser = {
                immediateSupervisor,
                userName,
                id: userId,
                fullName,
            };

            organizationUnitUsers.push(organizationUnitUser);

            const {
                displayName,
                code,
                parentId,
                isSalesArea,
                id,
            } = this.getSelectedOrganizationUnit();

            const organizationUnit = {
                displayName,
                code,
                parentId,
                isSalesArea,
                id,
                organizationUnitUsers,
            };

            return organizationUnit;
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
        async updateUser(data) {
            try {
                this.isSavingUserData = true;
                await client3B.user.update(data);
                successHandler(this, "Usuario actualizado correctamente");
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.isSavingUserData = false;
            }
        },
    },
    computed: {
        reassignDateFunction() {
            return moment(this.userFormData.reassignDate);
        },
        isUserAdmin() {
            return this.userFormData.permissions ? isAdmin(this.userFormData.permissions) : false;
        },
        isUserBoss() {
            return this.userFormData.permissions
                ? isSupervisor(this.userFormData.permissions)
                : false;
        },
    },
};
</script>

<style scoped>
.ant-row-flex {
    margin-bottom: 1rem;
}

.ant-row-flex:last-child {
    margin-bottom: 0;
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
