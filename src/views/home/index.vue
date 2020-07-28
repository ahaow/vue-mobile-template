<template>
  <div class="home">
    <input type="text" v-model="name" @input="handleInput" />

    <button @click='handleClick'>点击</button>
  </div>
</template>

<script>
import { getDate, TimeFormat,_debounce } from "@/utils/utils";
export default {
  name: "home",
  data() {
    return {
      name: "",
      timer: null,
    };
  },
  methods: {
    ajaxfn() {
      console.log(this.timer)
    },
    handleInput() {
      _debounce(this.ajaxfn,1500)
      // clearTimeout(this.timer);
      // this.timer = setTimeout(() => {
      //   console.log(this.name);
      // }, 1500);
    },
    handleClick() {
      this.$loading.show()
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.home {
}
</style>