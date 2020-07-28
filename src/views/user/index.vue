<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>刷新次数: {{ count }}</div>
    <div class="user" id="user">{{name}}</div>

    <input type="text" v-model="value" @change="handleChange" />
  </van-pull-refresh>
</template>

<script>
import { mapState } from "vuex";
import { PullRefresh } from "vant";
export default {
  name: "user",
  data() {
    return {
      isLoading: "",
      count: "",
      value: "",
    };
  },
  components: {
    vanPullRefresh: PullRefresh,
  },
  computed: {
    ...mapState(["name"]),
  },
  methods: {
    handleChange() {
      console.log(this.value);
    },
    onRefresh() {

    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.user {
}
</style>