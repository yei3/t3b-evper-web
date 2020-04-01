<template>
    <div class="UserForm">
        <form @submit="handleSubmit">
            <a-row type="flex" justify="center" :gutter="24">
                <a-col :span="8">
                    <label for="name">Nombre</label>
                    <a-input id="name" :value="user.name" :disabled="true" />
                </a-col>
                <a-col :span="8">
                    <label for="surname">Apellidos</label>
                    <a-input id="firstLastName" :value="user.firstLastName" :disabled="true" />
                </a-col>
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
                <a-col :span="8">
                    <label for="jobDescription">Puesto</label>
                    <a-input
                        id="jobDescription"
                        :value="user.jobDescription"
                        @change="handleInputChange"
                    />
                </a-col>
                <a-col :span="8">
                    <label for="immediateSupervisor">Jefe inmediato</label>
                    <a-input
                        id="immediateSupervisor"
                        :value="user.immediateSupervisor"
                        @change="handleInputChange"
                    />
                </a-col>
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
                <a-col :span="8">
                    <label for="emailAddress">Email</label>
                    <a-input
                        id="emailAddress"
                        :value="user.emailAddress"
                        @change="handleInputChange"
                    />
                </a-col>
                <a-col :span="8">
                    <label for="scholarship">Escolaridad</label>
                    <a-input
                        id="scholarship"
                        :value="user.scholarship"
                        @change="handleInputChange"
                    />
                </a-col>
            </a-row>
            <a-row type="flex" justify="center" :gutter="24">
                <a-col :span="8">
                    <label for="region">Región</label>
                    <a-select
                        id="region"
                        :value="userRegionCode"
                        :loading="loadingRegions"
                        :disabled="loadingRegions"
                        @select="handleRegionSelect"
                        :options="userFormRegions"
                        placholder="Seleccione una Región"
                    >
                    </a-select>
                </a-col>
                <a-col :span="8">
                    <label for="area">Área</label>
                    <a-select
                        id="area"
                        :value="userAreaCode"
                        :loading="loadingAreas"
                        :disabled="loadingAreas || loadingRegions"
                        :options="userFormAreas"
                        @select="handleAreaSelect"
                    >
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
                        format="DD/MM/YYYY"
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
                        :loading="loading"
                        :ghost="true"
                        >Guardar cambios</a-button
                    >
                    <a-popconfirm title="Confirmar eliminacion de usuario?" @confirm="removeUser">
                        <a-icon slot="icon" type="question-circle-o" />
                        <a-button
                            class="actions-container__button"
                            icon="delete"
                            type="danger"
                            :loading="loading"
                            :ghost="true"
                            >Eliminar usuario</a-button
                        >
                    </a-popconfirm>
                    <a-popconfirm title="Desea continuar?" @confirm="resetUserPass">
                        <a-icon slot="icon" type="question-circle-o" />
                        <a-button
                            class="actions-container__button"
                            icon="undo"
                            type="danger"
                            :loading="loading"
                            >Resetear contraseña</a-button
                        >
                    </a-popconfirm>
                </a-col>
            </a-row>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import moment from "moment";
import client3B from "@/api/client3B";
import errorHandler from "@/views/errorHandler";
import successHandler from "@/views/successHandler";

import { isAdmin, isSupervisor } from "@/utils/check-permissions";

import searchRegion from "@/utils/filter-region";
import searchArea from "@/utils/filter-area";

import { FORM_DATE_FORMAT, ROLES } from "@/utils/constants";

export default {
    mounted() {
        Promise.all([this.getRegionsAsync(), this.getAreasAsync(this.userRegionCode)]);
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            const {
                userName,
                name,
                firstLastName,
                emailAddress,
                scholarship,
                reassignDate,
                roles,
                immediateSupervisor,
                id,
            } = this.user;

            const { displayName: region } = searchRegion(this.userRegionCode, this.regionsArray);
            const { displayName: area } = searchArea(this.userAreaCode, this.areasArray);

            let reassignDateValue;
            /*
             * Validate the date because sometimes it receives extraneous values
             */
            if (moment(reassignDate).isValid()) {
                reassignDateValue = moment(reassignDate, FORM_DATE_FORMAT).format(FORM_DATE_FORMAT);
            } else {
                reassignDateValue = moment(reassignDate, FORM_DATE_FORMAT).format(FORM_DATE_FORMAT);
            }

            const userData = {
                userName,
                name,
                firstLastName,
                emailAddress,
                fullName: `${name} ${firstLastName}`,
                roles,
                scholarship,
                reassignDate: reassignDateValue,
                area,
                areaCode: this.userAreaCode,
                region,
                regionCode: this.userRegionCode,
                immediateSupervisor,
                id,
            };

            const data = {
                ...this.user,
                ...userData,
                isActive: true,
            };

            this.updateUser(data);
        },
        handleRegionSelect(value) {
            this.updateRegionCode(value);
            this.getAreasAsync(this.userRegionCode);
        },
        handleAreaSelect(value) {
            this.updateAreaCode(value);
        },
        handleInputChange({ target }) {
            const { id, value } = target;
            this.user[id] = value;
        },
        handleDatePickerChange(date) {
            if (date) {
                this.user.reassignDate = moment(date);
            } else {
                this.user.reassignDate = this.user.reassignDate;
            }
        },
        handleBossSwitchChange(checked) {
            if (!this.user.roles && checked) {
                this.user.roles = [ROLES.SUPERVISOR];
            } else if (checked) {
                this.user.roles.push(ROLES.SUPERVISOR);
            } else {
                this.removePermission(ROLES.SUPERVISOR);
            }
        },
        handleAdminSwitchChange(checked) {
            if (!this.user.roles && checked) {
                this.user.roles = [ROLES.ADMINISTRATOR];
            } else if (checked) {
                this.user.roles.push(ROLES.ADMINISTRATOR);
            } else {
                this.removePermission(ROLES.ADMINISTRATOR);
            }
        },
        removePermission(permissionName) {
            const { roles } = this.user;
            const roleIndex = roles.findIndex((role) => role === permissionName);
            roles.splice(roleIndex, 1);
        },
        async updateUser(data) {
            try {
                this.requestStart();
                await client3B.user.update(data);
                successHandler(this, "Usuario actualizado correctamente");
            } catch (error) {
                errorHandler(this, error);
            } finally {
                this.requestEnd();
            }
        },
        removeUser() {
            this.deleteUser(this.user.id);
        },
        resetUserPass() {
            const { userName, emailAddress } = this.user;

            const userData = {
                employeeNumber: userName,
                email: emailAddress,
                password: `${userName}_t3B`,
                confirmPassword: `${userName}_t3B`,
            };

            this.resetUserPassword(userData);
        },
        ...mapMutations([
            "updateRegionCode",
            "updateAreaCode",
            "requestStart",
            "requestEnd",
            "requestError",
            "loadingRegionsStart",
            "loadingRegionsEnd",
            "loadingAreasStart",
            "loadingAreasEnd",
        ]),
        ...mapActions(["getRegionsAsync", "getAreasAsync", "deleteUser", "resetUserPassword"]),
    },
    computed: {
        reassignDateFunction() {
            return moment(this.user.reassignDate, FORM_DATE_FORMAT);
        },
        isUserAdmin() {
            return this.user.roles ? isAdmin(this.user.roles) : false;
        },
        isUserBoss() {
            return this.user.roles ? isSupervisor(this.user.roles) : false;
        },
        ...mapGetters([
            "user",
            "loading",
            "errors",
            "userRegionCode",
            "userAreaCode",
            "loadingRegions",
            "loadingAreas",
            "userFormRegions",
            "userFormAreas",
            "regionsArray",
            "areasArray",
        ]),
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
