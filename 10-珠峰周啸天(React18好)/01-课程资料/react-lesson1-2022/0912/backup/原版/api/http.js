import axios from "axios";
import qs from 'qs';
import { message } from 'antd';
import utils from '@/assets/utils';

const http = axios.create({
    baseURL: '/api',
    timeout: 60000
});
http.defaults.transformRequest = data => {
    if (utils.isPlainObject(data)) data = qs.stringify(data);
    return data;
};
http.interceptors.response.use(response => {
    return response.data;
}, reason => {
    message.error('当前网络繁忙，请您稍后再试~');
    return Promise.reject(reason);
});
export default http;