import Vue from 'vue'
import router from "./routes"
import store from "./store"
import App from './App.vue'
import { get, post } from "./request/http"
import Loading from "./components/loading"
import Dialog from "./components/dialog"
// import VConsole from "vconsole";

// import Fastclick from "fastclick"

Vue.config.productionTip = false
Vue.prototype.$http = { get, post }
Vue.prototype.$loading = Loading;
Vue.prototype.$Dialog = Dialog;
// const vconsole = new VConsole();

// Fastclick.attach(document.body);
// Fastclick.prototype.focus = (el) => { 'use strict', ele.focus }

// Vue.directory("click-outside", {
//   bind(el, binding, vnode) {
//     function documentHandler(e) {
//       const _target = e._target;
//       if(el.contains(_target)) return false;
//       if(binding.expression) binding.value(e)
//     }
//   }
// })


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
