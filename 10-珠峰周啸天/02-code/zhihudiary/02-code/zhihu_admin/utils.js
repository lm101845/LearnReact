const { secret = 'ZFPX', maxAge = '7d', server = 7000 } = require('./package.json').config || {};
const jwt = require('jsonwebtoken');

// 检测是否为纯粹对象
const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || Object.prototype.toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
};

// Token编译和解编译
const Token = {
    sign(data) {
        if (!isPlainObject(data)) return;
        return jwt.sign(data, secret, { expiresIn: maxAge });
    },
    verify(token) {
        try {
            let data = jwt.verify(token, secret);
            return {
                token: true,
                data
            };
        } catch (err) {
            return {
                token: false,
                data: err
            };
        }
    }
};

// JSON数据转换&过滤
const filter = function filter(data) {
    try {
        data = JSON.parse(data);
    } catch (e) {
        data = [];
    }
    return data;
};

// 服务器返回结果
const responsePublic = function responsePublic(res, flag = true, options) {
    if (!isPlainObject(options)) options = {};
    options = Object.assign({
        code: flag ? 0 : 1,
        codeText: flag ? 'OK' : 'NO'
    }, options);
    res.send(options);
};

// 获取用户详细信息
const queryUserInfo = function queryUserInfo(req, userId) {
    let item = req.$USERDATA.find(item => +item.id === +userId);
    if (!item) return {};
    let { id, name, phone, pic } = item;
    if (!/^https?:\/\//.test(pic)) pic = `http://127.0.0.1:${server}/${pic}`;
    return {
        id,
        name,
        phone,
        pic
    };
};

// 延迟函数
const delay = function delay(interval) {
    typeof interval !== "number" ? interval = 1000 : null;
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

module.exports = {
    Token,
    isPlainObject,
    filter,
    responsePublic,
    queryUserInfo,
    delay
};