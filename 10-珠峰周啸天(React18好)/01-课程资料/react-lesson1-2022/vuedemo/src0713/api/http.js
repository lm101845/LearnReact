import axios from "axios";
import qs from 'qs';
import utils from '@/assets/utils';
import { Message } from 'element-ui';

const http = axios.create({
    baseURL: '/api',
    timeout: 60000
});
http.defaults.transformRequest = data => {
    if (utils.isPlainObject(data)) return qs.stringify(data);
    return data;
};
http.interceptors.response.use(response => {
    return response.data;
}, reason => {
    Message.error('小主，当前网络繁忙，请您稍后再试~');
    return Promise.reject(reason);
});
export default http;