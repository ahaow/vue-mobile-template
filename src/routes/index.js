import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const router = new VueRouter({
    base: process.env.NODE_ENV === "production" ? '/' : '/',
    mode: "hash",
    routes: [
        {
            path: "/",
            redirect: '/home'
        },
        {
            path: "/home",
            name: "Home",
            component: () => import("../views/home/index.vue"),
            meta: {
                title: "首页",
                keepAlive: false,
                auth: false,
            }
        },
        {
            path: "/user",
            name: "User",
            component: () => import("../views/user/index.vue"),
            meta: {
                title: "我的",
                keepAlive: false,
                auth: false,
            }
        },
        {
            path: "/other",
            name: "Other",
            component: () => import("../views/other/index.vue"),
            meta: {
                title: "其他",
                keepAlive: false,
                auth: false,
            }
        },
        {
            path: "/list",
            name: "List",
            component: () => import("../views/list/index.vue"),
            meta: {
                title: "列表",
                keepAlive: false,
                auth: false,
            }
        },
        {
            path: "/cs",
            name: "Cs",
            component: () => import("../views/cs/index.vue"),
            meta: {
                title: "测试",
                keepAlive: false,
                auth: false,
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    const token = localStorage.getItem("token") || null;
    if(!token && to.meta.auth) {
        // 跳转到404页面或者登录
    } else {
        next();
    }

})

export default router;