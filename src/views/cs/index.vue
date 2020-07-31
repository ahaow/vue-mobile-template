<template>
  <div>
    <input type="file" name="file" @change="handleChange" />

    <button @click="handleClick">点击</button>
  </div>
</template>

<script>
import { blob2dataURL, file2blob } from "./../../utils/file";
import { baseURL } from "./../../assets/data/base";
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
    handleClick() {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>