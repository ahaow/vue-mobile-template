// 日期格式化
export const dateFormat = (date, fmt) => {
    let result = date || new Date();
    let o = {
        'M+': result.getMonth() + 1, // 月份
        'd+': result.getDate(), // 日
        'h+': result.getHours(), // 小时
        'm+': result.getMinutes(), // 分
        's+': result.getSeconds(), // 秒
        'q+': Math.floor((result.getMonth() + 3) / 3), // 季度
        s: result.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (result.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}

// 日期年月日
export const getDate = (n) => {
    var date = new Date()
    date.setDate(date.getDate() + n)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    return year + '-' + month + '-' + day
}

// 时间格式化
export const TimeFormat = (val, s) => {
    if (!val) {
        return ''
    }
    if (s) {
        val = val * 1000
    }
    var date = new Date(val)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var min = date.getMinutes()
    var second = date.getSeconds()
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    min = min < 10 ? '0' + min : min
    second = second < 10 ? '0' + second : second
    return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
}

// 最多保留两位小数
export const formatMomey = (num) => {
    return Math.round(num * 100) / 100
}

// 防抖
export const _debounce = (fn, delay) => {

    var delay1 = delay || 200
    var timer
    return function () {
        console.log(timer)
        var th = this
        var args = arguments
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            timer = null
            fn.apply(th, args)

        }, delay1)
    }
}

// 节流
export const _throttle = (fn, interval) => {
    var last
    var timer
    var interval1 = interval || 200
    return function () {
        var th = this
        var args = arguments
        var now = +new Date()
        if (last && now - last < interval) {
            clearTimeout(timer)
            timer = setTimeout(function () {
                last = now
                fn.apply(th, args)
            }, interval1)
        } else {
            last = now
            fn.apply(th, args)
        }
    }
}


/**
 * 一维转二维
 * @param {*} array 
 * @param {*} size 
 */
export const chunk = (array, size) => {
    const length = array.length ? array.length : 0;
    if (!length || !size) {
        return [];
    }
    let index = 0;
    let resIndex = 0;
    const result = new Array(Math.ceil(length / size));
    while (index < length) {
        result[resIndex++] = array.slice(index, (index += size));
    }
    return result;
}