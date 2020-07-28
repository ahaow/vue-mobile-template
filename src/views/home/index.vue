<template>
  <div class="home">
    <input type="text" v-model="name" @change="handleInput" />
    <button @click="handleClick">点击</button>
    <ul v-show="show">
      <li v-for="item in list" :key="item.id" @click="handleClickName(item)">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { getDate, TimeFormat, _debounce } from "@/utils/utils";
export default {
  name: "home",
  data() {
    return {
      name: "",
      timer: null,
      show: false,
      list: [
        {
          id: 1,
          name: "半藏",
        },
        {
          id: 2,
          name: "源氏",
        },
      ],
      index: null,
    };
  },
  methods: {
    ajaxfn() {
      console.log(this.timer);
    },
    handleInput() {
      // console.log(this.name)
    },
    handleClickName(item) {
      this.name += item.name + " ";
      this.show = false;
    },
    handleClick() {
      // this.$loading.show();
      this.show = false;
    },
  },
  watch: {
    name(newV, oldV) {
      let result = this.index;
      if (newV.lastIndexOf("@") !== -1) {
        this.index = newV.lastIndexOf("@");
        if (this.index != result) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.home {
}
</style>