<template>
    <div class="upload-component">
        <a-spin :spinning="spinning" size="large" tip="Espere un momento, por favor">
            <a-upload-dragger
                class="uploader--custom"
                name="file"
                :disabled="isUploadDisabled"
                :action="getActionURL"
                :multiple="false"
                :showUploadList="false"
                @change="handleChange"
            >
                <div v-if="uploadState === 'initial'">
                    <p class="ant-upload-drag-icon">
                        <a-icon type="cloud-upload" />
                    </p>
                    <p class="ant-upload-text">
                        <slot name="info-message">
                            Haga click o arrastre el archivo de
                            <b>Excel</b> para importar los usuarios.
                        </slot>
                    </p>
                </div>
                <div v-else-if="uploadState === 'success'">
                    <p class="ant-upload-drag-icon">
                        <a-icon type="check" :style="{ color: 'rgba(0, 255, 0, .7)' }" />
                    </p>
                    <p class="ant-upload-text">El archivo se subió correctamente.</p>
                    <a-button @click="retryUpload" type="primary">Subir otro archivo</a-button>
                </div>
                <div v-else>
                    <p class="ant-upload-drag-icon">
                        <a-icon type="meh" :style="{ color: 'rgba(255, 0, 0, .7)' }" />
                    </p>
                    <p class="ant-upload-text">
                        Ocurrió un error mientras se subía el archivo, por favor, inténtelo
                        nuevamente.
                    </p>
                    <a-button @click="retryUpload" type="default" icon="reload"
                        >Inténtelo nuevamente</a-button
                    >
                </div>
            </a-upload-dragger>
        </a-spin>
    </div>
</template>

<script>
import errorHandler from "@/views/errorHandler";
import successHandler from "@/views/successHandler";

export default {
    props: {
        url: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            spinning: false,
            uploadState: "initial",
        };
    },
    methods: {
        handleChange({ file }) {
            const { status } = file;
            if (status === "done") {
                successHandler(this, "El fichero se subió correctamente", 10);
                this.spinning = false;
                this.uploadState = "success";
            } else if (status === "error") {
                errorHandler(this, "Ocurrió un error al subir el fichero", 15);
                this.spinning = false;
                this.uploadState = "error";
            } else {
                this.$message.info("Subiendo archivo", 5);
                this.spinning = true;
            }
        },
        retryUpload() {
            this.uploadState = "initial";
        },
    },
    computed: {
        getActionURL() {
            return `${process.env.VUE_APP_API_URL}/${this.url}`;
        },
        isUploadDisabled() {
            return this.uploadState === "success" || this.uploadState === "error";
        },
    },
};
</script>

<style>
.ant-spin-blur {
    filter: blur(5px);
}

.ant-spin-text {
    font-size: 1rem;
}
</style>
