
<template>
    <div class="users">
        <a-row class="breadcrumb-wrapper">
            <a-col :span="24">
                <h1 class="breadcrumb-header">Historial de mis evaluaciones</h1>
            </a-col>
            <a-col :span="24">
                <a-breadcrumb>
                    <a-breadcrumb-item>
                        <router-link :to="{ name: 'collaborator-home' }"
                            class="breadcrumb-path"
                        >
                            Home
                        </router-link>
                    </a-breadcrumb-item>
                </a-breadcrumb>
            </a-col>
        </a-row>
        <div class="collapse-content">
            <div>
                <a-row class="steps">
                    <span class="breadcrumb-header" style="font-weight: 120;">
                        Historial de mis evaluaciones
                    </span>

                </a-row>
                <a-divider />

            </div>

            <!-- Edit form -->
            <div>
                <a-row style="margin-top: 30px;">

                    <a-col :span="24">
                        <pending-evaluations />
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
            users: [],
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getAllUsers();
    },
    methods: {
        async getAllUsers() {
            this.spin = true;
            let response = null;
            try {
                response = await client3B.user.getAll();
                this.users = response.data.result.items;
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
    },
};
</script>

<style>
    .collapse-content {
        margin: 32px;
        background: white;
    }
</style>
