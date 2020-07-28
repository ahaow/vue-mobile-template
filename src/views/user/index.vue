<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>刷新次数: {{ count }}</div>
    <div class="user" id="user">{{name}}</div>
  </van-pull-refresh>
</template>

<script>
import { mapState } from "vuex";
import { PullRefresh } from "vant";
export default {
  name: "user",
  data() {
    return {};
  },
  components: {
    vanPullRefresh: PullRefresh
  },
  computed: {
    ...mapState(["name"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.user {
}
</style>