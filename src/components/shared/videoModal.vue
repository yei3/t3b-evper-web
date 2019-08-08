<template>
    <div class="video-modal">
        <a-modal
            :visible="visible"
            style="top: 20px"
            cancelText="No volver a mostrar video"
            okText="Entendido"
            :maskClosable="false"
            :closable="false"
            @cancel="handleCancel"
            @ok="handleOk"
        >
            <video ref="video" controls width="100%">
                <source v-if="userRole === 'Supervisor'" :src="videoUrl" type="video/mp4" />
                <source v-if="userRole === 'Collaborator'" :src="videoUrl" type="video/mp4" />
                <p>Sorry, your browser doesn't support embedded videos.</p>
            </video>
        </a-modal>
    </div>
</template>

<script>
import videoPreference from "@/services/videoPreference";

export default {
    name: "videoModalComponent",
    props: {
        userRole: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            visible: false,
        };
    },
    computed: {
        videoUrl() {
            return `${process.env.VUE_APP_BLOB_URL}/videos/evaluacion_hevc.mp4`;
        },
    },
    methods: {
        handleOk() {
            this.visible = false;
            this.pauseVideo();
            videoPreference.saveVideoPreference();
        },
        handleCancel() {
            this.visible = false;
            this.pauseVideo();
            videoPreference.saveShouldNeverDisplayVideo();
        },
        showModal() {
            this.visible = true;
        },
        pauseVideo() {
            this.$refs.video.pause();
        },
    },
};
</script>

<style scoped lang="scss"></style>
