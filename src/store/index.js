import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        name: "wh",
        age: '25',
        date: "2020/07/28"
    },
    getters: {

    },
    mutations: {
        
    },
    actions: {

    }
})

export default store