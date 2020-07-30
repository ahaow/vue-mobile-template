import Vue from "vue"
import Main from "./main.vue"

const DialogConstructor = Vue.extend(Main);

let instance
const Dialog = {
    show(options) {
        options = options || {
            title: "标题",
            content: "没有内容"
        }
        instance = new DialogConstructor({
            propsData: options
        })
        instance.vm = instance.$mount();
        document.body.appendChild(instance.vm.$el)
        return instance.vm
    },
    hide() {
        document.body.removeChild(instance.vm.$el)
    }
}

export default Dialog;