<template>
  <div id="app">
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
// const initRem = () => {
//   let cale =
//     window.screen.availWidth > 750 ? 2 : window.screen.availWidth / 375;
//   document.documentElement.style.fontSize = `${100 * cale}px`;
// };

// window.addEventListener("DOMContentLoaded", () => {
//   const html = document.getElementsByTagName("html")[0];
//   let fontSize = window.innerWidth / 10;
//   fontSize = fontSize > 50 ? 50 : fontSize;
//   html.style.fontSize = fontSize + "px";
// });

export default {
  name: "App",
  components: {
  },
};
</script>

<style>
/* css-loader会把非根路径的url解释为相对路径,加前缀 ~ 才会解释为模块路径 */
@import "~@/assets/scss/reset.scss";
@import "~@/assets/scss/normalize.scss";
@import "~@/assets/scss/common.scss";
</style>
