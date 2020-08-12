<template>
  <div class="cs">
    <video
      autoplay="autoplay"
      preload="auto"
      type="application/vnd.apple.mpegurl"
      webkit-playsinline="true"
      playsinline
      x-webkit-airplay="true"
      class="full-height full-width"
      controls="controls"
      :src="videoSrc"
      ref="video"
    ></video>
  </div>
</template>

<script>
import Hls from "hls.js";
export default {
  name: "cs",
  data() {
    return {
      videoSrc: "",
    };
  },
  computed: {},
  methods: {
    getStream(source) {
      console.log("wdnmd");
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(source);
        console.log(2);
        this.hls.attachMedia(this.$refs.video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.$refs.video.play();
        });
      }
    },
  },
  mounted() {
    const u = navigator.userAgent;
    alert(u);
    let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let uc = navigator.userAgent.indexOf("UCBrowser") > -1;
    let aliApp = navigator.userAgent.indexOf("AliApp(DingTalk") > -1;
    let str = "http://192.168.38.96:10104/live/1291638743681204225.m3u8";
    let qqApp = new RegExp("MQQBrowser").test(navigator.userAgent);

    if (isiOS) {
      alert(1);
      this.videoSrc = str;
    } else if (isAndroid) {
      if (uc || aliApp || qqApp) {
        alert(2);
        this.videoSrc = str;
      } else {
        alert(3);
        this.getStream(str);
      }
    } else {
      alert(4);
      this.getStream(str);
    }
  },
};
</script>

<style lang="scss" scoped>
.cs {
  height: 5000px;
  color: red;
  video {
    width: 300px;
    height: 200px;
  }
}
</style>