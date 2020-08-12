<template>
  <div class="video-template">
    <div class="video-panel" v-show="loading">
      <div class="video-panel-img">
        <img
          src="https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2534506313,1688529724&fm=26&gp=0.jpg"
          alt
        />
      </div>
      <p>正在加载, 请耐心等待...</p>
    </div>
    <div v-show="!loading" class="video-player-warpper">
      <div class="player-video">
        <video ref="video" preload="auto" :src="videoSrc"></video>
      </div>
      <div class="player-controls">
        <!-- 控制时长 -->
        <div class="player-controls-t">
          <div class="player-controls-line" :style="{width: lineWidth + '%'}"></div>
        </div>
        <!-- 控制其他 -->
        <div class="player-controls-b">
          <div class="player-controls-b-l">
            <div class="play">
              <i v-show="!play" class="iconfont iconicon_play" @click="handlePlay"></i>
              <i v-show="play" class="iconfont iconweibiaoti519" @click="handlePause"></i>
            </div>
            <div class="time">
              <span>{{currentTime}}</span>&nbsp;
              <span>/</span>&nbsp;
              <span>{{duration}}</span>
            </div>
          </div>
          <div class="player-controls-b-r">
            <ul class="r-list">
              <!-- 控制清晰度 -->
              <li class="r-item definition">
                <span class="text">清晰度</span>
                <ol class="definition-list">
                  <li
                    class="definition-item"
                    :class="definitionKey == item.key ? 'current' : ''"
                    v-for="item in definitionList"
                    :key="item.key"
                    @click="handleSetDefinition(item.key)"
                  >{{item.text}}</li>
                </ol>
              </li>
              <!-- 控制倍速 -->
              <li class="r-item rate">
                <span class="text">倍速</span>
                <ol class="rate-list">
                  <li
                    class="rate-item"
                    :class="speedKey == item.key ? 'current' : ''"
                    v-for="item in speedList"
                    @click="handleSetSpeed(item.key,item.speed)"
                    :key="item.speed"
                  >{{item.text}}</li>
                </ol>
              </li>
              <!-- 音量按钮 -->
              <li class="r-item setting">
                <span class="icon iconfont iconshezhi"></span>
                <ol class="setting-list">
                  <li class="setting-item">
                    <span>循环播放</span>
                    <vant-switch
                      v-model="loop"
                      active-color="#369"
                      inactive-color="#fff"
                      size="16px"
                    />
                  </li>
                </ol>
              </li>
              <!-- 音量按钮 -->
              <li class="r-item sy">
                <span class="icon iconfont iconyinliang"></span>
                <div class="paly-volumebar-wrp">
                  <div class="txt" ref="volumeVal">0</div>
                  <div class="scroll" id="scroll">
                    <div class="bar" id="bar"></div>
                    <div class="mask" id="mask"></div>
                  </div>
                </div>
              </li>
              <!-- 画中画按钮   -->
              <li class="r-item qp" @click="handleCanvas">
                <span class="icon iconfont iconchuangkouhua"></span>
              </li>
              <!-- 全屏按钮   -->
              < li class="r-item qp" @click="FullScreen">
                <span class="icon iconfont iconquanping"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Switch } from "vant";
export default {
  name: "video1",
  components: {
    "vant-switch": Switch,
  },
  data() {
    return {
      videoSrc: "", // 视频播放源
      loading: true,
      lineWidth: 0,
      duration: "", // 视频总时长(格式化)
      durationNum: "", // 视频总时长(数值化)
      currentTime: "00:00", // 当前视频时间
      play: false, // 播放 or 暂停
      video: null, // 播放器dom
      speedKey: 1, // 倍速索引
      speedList: [
        //倍速列表
        {
          key: 0,
          speed: 0.5,
          text: "0.5x",
        },
        {
          key: 1,
          speed: 1.0,
          text: "1.0x",
        },
        {
          key: 2,
          speed: 2.0,
          text: "2.0x",
        },
        {
          key: 3,
          speed: 3.0,
          text: "3.0x",
        },
      ],
      definitionKey: 1, // 清晰度索引
      definitionList: [
        {
          key: 3,
          text: "4k 蓝光",
        },
        {
          key: 2,
          text: "1080p",
        },
        {
          key: 1,
          text: "720px",
        },
        {
          key: 0,
          text: "480p",
        },
      ],
      loop: false,
    };
  },
  computed: {},
  methods: {
    // 模拟ajax获取视频
    handleGetSrc() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let str =
            "http://192.168.38.96:10103//upload/rec/1282966202179649537.20200714174419.mp4";
          if (str) {
            resolve(str);
          } else {
            reject("404");
          }
        }, 200);
      });
    },
    // 执行ajax后续操作
    handleAsync() {
      this.handleGetSrc()
        .then((res) => {
          this.videoSrc = res;
          this.loading = false;
          this.video = this.$refs.video;
          this.handleVideoCanplay();
          this.handleVideoTimeupdate();
          this.handleVideoEnded();
          this.handleVideoPlay();
          this.handleVideoPause();
          this.handleBarDown();
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    // 监听video canplay 当浏览器可以开始播放音频/视频时触发
    handleVideoCanplay() {
      this.video.addEventListener("canplay", () => {
        let a = Math.floor(this.video.duration / 60);
        let b = Math.floor(this.video.duration % 60);
        a < 10 ? (a = "0" + a) : (a = a);
        b < 10 ? (b = "0" + b) : (b = b);
        this.durationNum = this.video.duration;
        this.duration = a + ":" + b; // 总时长
      });
    },
    // 监听video timeupdate 当目前的播放位置已更改时触发
    handleVideoTimeupdate() {
      this.video.addEventListener("timeupdate", () => {
        // 当前播放时长
        let time = Math.floor(this.video.currentTime);
        let str;
        if (time < 10) {
          str = "00:0" + time;
        } else if (time >= 10 && time <= 59) {
          str = "00:" + time;
        } else if (time >= 60) {
          let a = Math.floor(time / 60);
          let b = Math.floor(time % 60);
          a < 10 ? (a = "0" + a) : (a = a);
          b < 10 ? (b = "0" + b) : (b = b);
          str = a + ":" + b;
        }
        this.currentTime = str;
        let result = (time / this.durationNum) * 100;
        this.lineWidth = result;
      });
    },
    // 监听video ended 当目前的播放列表已结束时触发
    handleVideoEnded() {
      this.video.addEventListener("ended", () => {
        this.lineWidth = 100;
        this.play = false;
      });
    },
    // 监听video pause 当音频/视频已暂停时触发
    handleVideoPlay() {
      this.video.addEventListener("play", () => {
        console.log(2);
        this.handlePlay();
      });
    },
    // 监听video pause 当音频/视频已暂停时触发
    handleVideoPause() {
      this.video.addEventListener("pause", () => {
        console.log(1);
        this.handlePause();
      });
    },
    // 点击播放
    handlePlay() {
      this.play = true;
      this.video.play();
    },
    // 点击暂停
    handlePause() {
      this.play = false;
      this.video.pause();
    },
    // 控制视频播放器全屏
    FullScreen() {
      const videoDom = this.$refs.video;
      if (videoDom.requestFullscreen) {
        videoDom.requestFullscreen();
      } else if (videoDom.mozRequestFullScreen) {
        videoDom.mozRequestFullScreen();
      } else if (videoDom.webkitRequestFullScreen) {
        videoDom.webkitRequestFullScreen();
      }
    },
    // 控制开启视频画中画
    async handleCanvas() {
      try {
        if (this.video !== document.pictureInPictureElement) {
          await this.video.requestPictureInPicture();
        } else {
          await document.exitPictureInPicture();
        }
        // 进入画中画模式时候执行
        this.video.addEventListener("enterpictureinpicture", (event) => {
          event.preventDefault();
        });
        // 退出画中画模式时候执行
        this.video.addEventListener("leavepictureinpicture", (event) => {});
      } catch (error) {
        log(`> Argh! ${error}`);
      }
    },
    // 控制音量移动
    handleBarDown(e) {
      const scroll = document.getElementById("scroll");
      const bar = document.getElementById("bar");
      const mask = document.getElementById("mask");
      const volumeVal = this.$refs.volumeVal;
      const scrollHeight = scroll.offsetHeight;
      const barHeight = bar.offsetHeight;
      let barTop;
      let delVal = scrollHeight - barHeight;
      bar.onmousedown = (event) => {
        let topVal = event.clientY - bar.offsetTop;
        document.onmousemove = (event) => {
          barTop = event.clientY - topVal;
          if (barTop < 0) {
            barTop = 0;
          } else if (barTop < scrollHeight - barHeight) {
            bar.style.bottom = delVal - barTop + "px";
            mask.style.height = delVal - barTop + "px";
            // console.log(55 / (delVal - barTop / 55));
            console.log(55 / barTop);
            /**
             * 55 = 100 0.55 = 1;
             *
             */
          } else if (barTop >= scrollHeight - barHeight) {
            barTop = scrollHeight - barHeight;
          }
        };
      };

      document.documentElement.onmouseup = () => {
        document.onmousemove = null;
      };
    },
    // 设置倍速
    handleSetSpeed(key, speed) {
      this.speedKey = key;
      this.video.playbackRate = speed;
    },
    // 设置清晰度
    handleSetDefinition(key) {
      this.definitionKey = key;
    },
  },
  mounted() {
    this.handleAsync();
  },
};
</script>

<style lang="scss" scoped>
// @keyframes iconAnimation {
//     0% {}
// }
html,
body {
  height: 3000px;
}
.video-template {
  position: relative;
  margin: 100px auto 0;
  width: 638px;
  height: 447px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  .video-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(218, 165, 32, 0.4);
    .video-panel-img {
      width: 320px;
      height: 184px;
      transform: scale(0.5);
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      color: #fff;
    }
  }
  .video-player-warpper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    .player-video {
      margin: 15px auto 20px;
      width: 624px;
      height: 372px;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        background-color: #000;
      }
    }
    .player-controls {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 44px;
      padding: 0 7px;
      box-sizing: border-box;
      background-color: #000;
      .player-controls-t {
        position: relative;
        margin-top: 3px;
        width: 100%;
        height: 2px;
        background-color: #333;
        cursor: pointer;
        .player-controls-line {
          position: absolute;
          height: 100%;
          background-color: #d9d9d9;
        }
      }
      .player-controls-b {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        .player-controls-b-l {
          display: flex;
          flex-direction: row;
          align-items: center;
          .play {
            i {
              color: #fff;
              cursor: pointer;
            }
          }
          .time {
            margin-left: 10px;
            font-size: 14px;
            color: #fff;
          }
        }
        .player-controls-b-r {
          .r-list {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;
            color: #fff;
            .r-item {
              margin-left: 15px;
              .icon {
                font-size: 20px;
              }
              .text {
                font-size: 16px;
              }
              &.qp {
                cursor: pointer;
                .icon {
                  font-size: 14px;
                }
              }
              &.setting {
                position: relative;
                .icon {
                  font-size: 14px;
                  cursor: pointer;
                }
                &:hover {
                  .setting-list {
                    visibility: visible;
                  }
                }
                .setting-list {
                  visibility: hidden;
                  position: absolute;
                  left: -55px;
                  top: -45px;
                  width: 120px;
                  height: auto;
                  padding-bottom: 20px;
                  background-color: #000;
                  .setting-item {
                    width: 100%;
                    padding: 5px 8px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 14px;
                  }
                }
              }
              &.sy {
                position: relative;
                cursor: pointer;
                &:hover {
                  .paly-volumebar-wrp {
                    visibility: visible;
                  }
                }
                .icon {
                  font-size: 16px;
                }
                .paly-volumebar-wrp {
                  position: absolute;
                  left: -5px;
                  top: -95px;
                  width: 32px;
                  height: 100px;
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  background-color: rgba(21, 21, 21, 0.9);
                  border-radius: 2px;
                  visibility: hidden;
                  .txt {
                    color: #e7e7e7;
                    font-size: 13px;
                  }
                  .scroll {
                    position: relative;
                    width: 2px;
                    height: 65px;
                    background: #ccc;
                    .bar {
                      width: 10px;
                      height: 10px;
                      background: #369;
                      position: absolute;
                      bottom: 0px;
                      left: -4px;
                      border-radius: 50%;
                      cursor: pointer;
                    }
                    .mask {
                      position: absolute;
                      left: 0;
                      bottom: 0;
                      background: #369;
                      width: 2px;
                      height: 0;
                    }
                  }
                }
              }
              &.rate {
                position: relative;
                .text {
                  font-size: 12px;
                  cursor: pointer;
                }
                &:hover {
                  .rate-list {
                    visibility: visible;
                  }
                }
                .rate-list {
                  visibility: hidden;
                  position: absolute;
                  bottom: 15px;
                  left: -10px;
                  padding-bottom: 20px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
                  align-items: center;
                  width: 50px;
                  height: 120px;
                  background-color: rgba(21, 21, 21, 0.9);
                  // background-color: red;
                  border-radius: 2px;
                  .rate-item {
                    font-size: 12px;
                    cursor: pointer;
                    &.current {
                      color: #00a1d6;
                    }
                  }
                }
              }
              &.definition {
                position: relative;
                .text {
                  font-size: 12px;
                  cursor: pointer;
                }
                &:hover {
                  .definition-list {
                    display: block;
                  }
                }
                .definition-list {
                  display: none;
                  position: absolute;
                  left: -20px;
                  bottom: 15px;
                  width: 70px;
                  padding-bottom: 20px;
                  box-sizing: border-box;
                  background-color: #000;
                  .definition-item {
                    padding: 8px 0;
                    text-align: center;
                    box-sizing: border-box;
                    font-size: 12px;
                    cursor: pointer;
                    &.current {
                      color: #00a1d6;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>