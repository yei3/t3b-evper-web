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
                <source
                    v-if="userType === 'Supervisor'"
                    src="https://tiendas3b.blob.core.windows.net/t3b/compressed.mp4"
                    type="video/mp4"
                />
                <source v-else src="https://tiendas3b.blob.core.windows.net/t3b/slipknot.mp4" tyep="video/mp4" />
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
        userType: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            visible: false,
        };
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
