/**
 * @Author liming
 * @Date 2023/9/7 10:13
 **/
import _ from '../assets/utils';
import qs from 'qs';
import { Toast } from 'antd-mobile';

/* 核心方法 */
let regGET = /^(GET|HEAD|DELETE|OPTIONS)$/i
let regPOST = /^(POST|PUT|PATCH)$/i
let initial = {
    method: 'GET',
    headers: null,
    body: null,
    params: null,
    signal: null,
    credentials: 'include',
    cache: 'no-cache',
    referrer: 'client',
    responseType: 'json'
}

const http = function http(url, options) {
    // 参数校验 & 合并配置项
    if (typeof url !== 'string') throw new TypeError('url请求地址必须是一个字符串');
    if (!_.isPlainObject(options)) options = {};
    options = Object.assign({}, initial, options);

    // 对配置项的格式和内容做一些校验{我只做了部分，思想：不符合格式直接抛异常、不符合格式不处理}
    let { method, headers, body, params, signal, credentials, cache, referrer, responseType } = options;
    method = String(method).toUpperCase();
    if (!regGET.test(method) && !regPOST.test(method)) throw new TypeError('请设置有效的请求方式');
    if (headers !== null && !_.isPlainObject(headers)) throw new TypeError('headers必须是null或者普通对象');
    if (!/^(arrayBuffer|blob|formData|json|text)$/.test(responseType)) throw new TypeError('responseType数据必须是合法内容「arrayBuffer、blob、formData、json、text」');

    // 特殊处理1：处理headers请求头
    let head = new Headers();
    if (headers) {
        Reflect.ownKeys(headers).forEach(key => {
            head.append(key, headers[key]);
        });
    }
    headers = head;

    // 特殊处理2：需要根据项目中的需求自定义处理「处理Token」 请求拦截器
    let token = _.storage.get('TK'),
        tokenList = ['/user_info', '/upload', '/user_update', '/store', '/store_remove', '/store_list'];
    if (token && tokenList.includes(url.replace(/^\/api/, ''))) {
        headers.append('authorization', token);
    }

    // 特殊处理3：处理body请求主体信息「根据当前项目要求」
    if (_.isPlainObject(body)) {
        body = qs.stringify(body);
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    // 特殊处理4：把params中的信息拼接到URL的末尾
    if (_.isPlainObject(params)) {
        params = qs.stringify(params);
        url += `${url.includes('?') ? '&' : '?'}${params}`;
    }

    // 基于fetch发送请求
    let config = {
        method,
        headers,
        credentials,
        cache,
        referrer,
        signal
    };
    if (regPOST.test(method)) config.body = body;
    return fetch(url, config)
        .then(response => {
            let { status, statusText } = response;
            if (!/^(2|3)\d{2}$/.test(status)) {
                // 请求失败
                return Promise.reject({
                    code: -1000,
                    status,
                    statusText
                });
            }
            // 请求成功
            return response[responseType]().catch(err => {
                // 转换失败
                return Promise.reject({
                    code: -2000,
                    message: err.message
                });
            });
        })
        .catch(reason => {
            let msg = '网络繁忙，请稍后再试~',
                { code, status } = reason;
            if (code === -1000) {
                switch (+status) {
                    case 404:
                        msg = '请求地址有误';
                        break;
                    case 500:
                        msg = '服务器出现异常';
                        break;
                    default:
                        msg = '获取数据失败';
                }
            } else if (code === -2000) {
                msg = '数据转换失败';
            } else if (code === 20) {
                msg = '请求被中断';
            }
            Toast.show({
                icon: 'fail',
                content: msg
            });
            return Promise.reject(reason);
        });
};
/* 快捷方法 */
['get', 'head', 'delete', 'options'].forEach(name => {
    http[name] = function (url, options) {
        if (!_.isPlainObject(options)) options = {};
        options.method = name;
        return http(url, options);
    };
});
['post', 'put', 'patch'].forEach(name => {
    http[name] = function (url, body, options) {
        if (!_.isPlainObject(options)) options = {};
        options.method = name;
        options.body = body;
        return http(url, options);
    };
});
export default http;
