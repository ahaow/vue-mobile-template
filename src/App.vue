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
html,body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
