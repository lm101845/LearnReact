/**
 * @Author liming
 * @Date 2023/9/2 13:02
 **/
/**封装fetch*/
import _ from '../assets/utils'
import qs from 'qs'
import {message} from "antd";
/*核心方法*/
// const baseURL = '/api'
const http = function http(config) {
    //默认值处理(初始化配置项 initial config) & 校验(validate——扩展：回去后，可以尝试对每一项都做校验，这里只校验一部分，其他默认值)
    if (!_.isPlainObject(config)) {
        config = {}
        //如果你没传活传的不是纯对象，直接赋值空对象
    }
    //Object.assign(target, ...sources),后面替换前面，返回前面
    config = Object.assign({
        url: '',
        method: 'GET',
        credentials: 'include',   //不论是不是跨域的请求，总是发送请求资源域
        headers: null,
        body: null,
        params: null,
        responseType: 'json',
        signal: null,   //用于取消 fetch 请求
    }, config)
    if (!config.url) throw new TypeError('url must be required')
    if (!_.isPlainObject(config.headers)) config.headers = {}
    if (config.params !== null && !_.isPlainObject(config.params)) config.params = null
    //用户传了params,但是传的格式不对，不是纯对象，我们忽略传的params,赋值给null

    //处理各种细节
    let {url, method, credentials, headers, body, params, responseType, signal} = config

    //1.处理问号传参
    // url = baseURL + url
    if (params) {
        url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`
    }

    //处理请求主体信息:按照我们后台要求，如果传递的是一个普通对象，我们要把其设置为urlencoded格式[设置请求头]？
    if (_.isPlainObject(body)) {
        body = qs.stringify(body)
        headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    //类似于axios中的请求拦截器，每一个请求，都把相关信息传递给服务器相同的内容在这里处理(假设token)
    let token = localStorage.getItem('tk')
    if (token) {
        headers['authorization'] = token
    }
    //发送请求
    method = method.toUpperCase()
    config = {
        method,
        credentials,
        headers,
        cache: 'no-cache',
        signal
    }
    if (/^(POST|PUT|PATCH)$/i.test(method) && body) {
        config.body = body
    }
    return fetch(url, config)
        .then(response => {
            let {status, statusText} = response
            if (/^(2|3)\d{2}$/.test(status)) {
                //请求成功(状态码以2或3开头)
                //根据不同的responseType进行读取数据处理(默认是json)
                let result;
                switch (responseType.toLowerCase()) {
                    case 'text':
                        result = response.text()
                        break;
                    case 'arraybuffer':
                        result = response.arrayBuffer()
                        break;
                    case 'blob':
                        result = response.blob()
                        break
                    default:
                        result = response.json()
                }
                return result

            }
            //请求失败：HTTP状态码失败
            return Promise.reject({
                code: -100,
                status,
                statusText
            })
        })
        .catch(reason => {
            //失败的统一提示
            if (reason && typeof reason === 'object') {
                let {code, status} = reason
                if (code === -100) {
                    switch (+status) {
                        case 400:
                            message.error("请求参数出现问题")
                            break;
                        //...
                    }
                } else if (code === 20) {
                    message.error("请求被中断了")
                }
            } else {
                message.error("当前网络繁忙，请您稍后再试~")
            }
            return Promise.reject(reason)   //统一处理完提示后，在组件中获取到的依然还是失败
        })
};

//快捷方法
["GET", "HEAD", "DELETE", "OPTIONS"].forEach(item => {
    http[item.toLowerCase()] = function (url, config) {
        if (!_.isPlainObject(config)) {
            //如果config没传，把它赋值成空对象
            config = {}
        }
        config['url'] = url
        config['method'] = item
        return http(config)
        //只是一个快捷方式而已，不在这里发请求(最后还是调用http方法)
    }
});

["POST", "PUT", "PATCH"].forEach(item => {
    http[item.toLowerCase()] = function (url, body, config) {
        if (!_.isPlainObject(config)) {
            config = {}
        }
        config['url'] = url
        config['method'] = item
        config['body'] = body
        return http(config)
    }
})

export default http
