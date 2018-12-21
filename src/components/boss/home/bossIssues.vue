<template>
    <div class="collapse">
        <a-row class="collapse-title background--title">
            <a-col :span="23" style="text-align: center;">
                Acciones por finalizar
            </a-col>
            <a-col :span="1" style="text-align: right;">
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
        <a-row class="collapse-content" v-show="!collapsed">
            <a-col :span="8">
                <a-badge count="6" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
                <span class="badged-text">Evaluaciones de colaboradores En procesos</span>
            </a-col>
            <a-col :span="9">
                <a-badge count="6" :numberStyle= "{backgroundColor: '#f8ac59'}"/>
                <span class="badged-text">Validación de objetivos de colaboradores En procesos</span>
            </a-col>
            <a-col :span="7">
                
            </a-col>
        </a-row>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.collapse-mod {
    font-weight: 600;
    font-size: 14px;
}

.collapse-mod >>> .ant-collapse-content {
    background-color: #f4f6fa;
    border-top: 0;
}

.collapse-mod >>> .ant-collapse-header {
    color: #fff;
}

.badges-collaborator {
    margin-top: 10px;
    margin-bottom: 15px;
}

.badged-text {
    font-weight: 600;
    font-size: 12px;
    color: #777;
    margin-left: 5px;
}
</style>
