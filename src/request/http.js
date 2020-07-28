import axios from 'axios';

switch (process.env.NODE_ENV) {
    case "production":
        axios.defaults.baseURL = "xxx"
        break;
    case "development":
        axios.defaults.baseURL = "xxx"
        break;
    case "debug":
        axios.defaults.baseURL = "xxx"
        break;
    default:
        break;
}

axios.defaults.timeout = 30000;

axios.interceptors.request.use(
    config => {
        console.log("config", config);
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        config.headers['token'] = localStorage.getItem("token");

        // 请求显示loading效果
        if (config.loading === true) {
            // 显示loading效果
            // vm.$loading.show()
        }
        return config;
    },
    error => {
        // vm.$loading.hide() 
        return Promise.reject(error);
    }
)

axios.interceptors.response.use(
    res => {
        // vm.$loading.show()
        if (res.data.code === 401) {
            // 登录失效, 重定向到登录页面
        }
        return res;
    },
    error => {
        // vm.$loading.hide() 
        return Promise.reject(error);
    }
)


export function get(url, data, loading) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: data
        }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}

export function post(url, data, loading) {
    return new Promise((resolve, reject) => {
        axios.post(url, data, { loading }).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
