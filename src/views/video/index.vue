<template>
  <div class="index">
    <video-component
      :videoSrc="videoSrc"
    ></video-component>
  </div>
</template>

<script>
import videoComponent from "@/components/videoComponent/index.vue";
export default {
  name: "video-index",
  components: {
    videoComponent,
  },
  data() {
    return {
      videoSrc: "http://192.168.38.96:10103//upload/rec/1282966202179649537.20200714174419.mp4"
    };
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>