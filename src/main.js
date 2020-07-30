import Vue from 'vue'
import router from "./routes"
import store from "./store"
import App from './App.vue'
import { get, post } from "./request/http"
import Loading from "./components/loading"
import Dialog from "./components/dialog"

Vue.config.productionTip = false
Vue.prototype.$http = { get, post }
Vue.prototype.$loading = Loading;
Vue.prototype.$Dialog = Dialog;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
