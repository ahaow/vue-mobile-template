<template>
  <div class="cs">
    123
    <input type="file" name="file" @change="handleChange" />

    <button @click="handleClick">点击</button>

    <div class="hide">
      <img :src="require('@/assets/images/loading.png')" alt="">
    </div>
  </div>
</template>

<script>
import { blob2dataURL, file2blob } from "./../../utils/file";
import { baseURL } from "./../../assets/data/base";
import NP from "number-precision";
export default {
  name: "cs",
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleChange(e) {
      let file = e.target.files[0];
      file2blob(file)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleClick() {
      throw new Error("123");
    },
  },
  mounted() {
    let a = 0.1;
    let b = 0.2;
    let c = a + b;
    let d = NP.plus(a, b);
    console.log(d);
    console.log(d === 0.3);
  },
};
</script>

<style lang="scss" scoped>
.cs {
  @include center;
  color: $color-error;
  height: 5000px;
}
</style>