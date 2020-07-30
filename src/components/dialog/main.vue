<template>
  <div class="dialog" v-show="show">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <h3 class="title" v-if="title">{{title}}</h3>
      <p class="content">{{content}}</p>
      <div class="dialog-cz">
        <div class="cancle" v-if="showCancle" @click="handleCancle">取消</div>
        <div class="confrim" @click="handleConfrim">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogaa",
  props: {
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    showCancle: {
      type: Boolean,
      default: false,
    },
    cancleCallback: {
      type: Function
    },
    canfirmCallback: {
      type: Function,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    handleCancle() {
      this.show = false;
      document.body.removeChild(this.$el);
      this.cancleCallback && this.cancleCallback();
    },
    handleConfrim() {
      // console.log(this.$el)
      this.canfirmCallback && this.canfirmCallback();
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.dialog {
  .dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
  }
  .dialog-box {
    position: fixed;
    top: 45%;
    left: 50%;
    width: 320px;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 16px;
    font-size: 16px;
    z-index: 1001;
    .title {
      text-align: center;
    }
    .content {
      padding: 10px 20px 0 20px;
      line-height: 21px;
    }
    .dialog-cz {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #ebedf0;
      .cancle,
      .confrim {
        flex: 1;
        height: 50px;
        line-height: 50px;
        box-sizing: border-box;
        text-align: center;
      }
      .cancle {
        color: #323233;
        border-right: 1px solid #ebedf0;
      }
      .confrim {
        color: #1989fa;
      }
    }
  }
}
</style>