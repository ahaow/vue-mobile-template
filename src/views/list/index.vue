     
<template>
  <div class="list">
    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
export default {
  name: "list",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleClick() {
      this.$Dialog.show({
        title: "奥古斯都",
        content: "公元前27年,屋大维",
        showCancle: true,
        cancleCallback: () => {
          console.log("concle");
        },
        canfirmCallback: () => {
          setTimeout(() => {
            this.$Dialog.hide();
          }, 2000);
          console.log("canfirm");
        },
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>