(function () {
    /* 检测数据类型 */
    const class2type = {},
        toString = class2type.toString,
        hasOwn = class2type.hasOwnProperty;
    const toType = function toType(obj) {
        let reg = /^\[object ([\w\W]+)\]$/;
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ?
            reg.exec(toString.call(obj))[1].toLowerCase() :
            typeof obj;
    };
    const isFunction = function isFunction(obj) {
        return typeof obj === "function" &&
            typeof obj.nodeType !== "number" &&
            typeof obj.item !== "function";
    };
    const isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };
    const isArrayLike = function isArrayLike(obj) {
        let length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            (typeof length === "number" && length > 0 && (length - 1) in obj);
    };
    const isPlainObject = function isPlainObject(obj) {
        let proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") return false;
        proto = Object.getPrototypeOf(obj);
        if (!proto) return true;
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && Ctor === Object;
    };
    const isEmptyObject = function isEmptyObject(obj) {
        let keys = Object.getOwnPropertyNames(obj);
        if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
        return keys.length === 0;
    };
    const isNumeric = function isNumeric(obj) {
        var type = toType(obj);
        return (type === "number" || type === "string") &&
            !isNaN(obj - parseFloat(obj));
    };

    /* 函数的防抖和节流 */
    const clearTimer = function clearTimer(timer) {
        if (timer) clearTimeout(timer);
        return null;
    };
    const debounce = function debounce(func, wait, immediate) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        if (typeof wait === "boolean") {
            immediate = wait;
            wait = undefined;
        }
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        if (typeof immediate !== "boolean") immediate = false;
        let timer = null;
        return function operate(...params) {
            let now = !timer && immediate;
            timer = clearTimer(timer);
            timer = setTimeout(() => {
                if (!immediate) func.call(this, ...params);
                timer = clearTimer(timer);
            }, wait);
            if (now) func.call(this, ...params);
        };
    };
    const throttle = function throttle(func, wait) {
        if (typeof func !== "function") throw new TypeError("func is not a function!");
        wait = +wait;
        if (isNaN(wait)) wait = 300;
        let timer = null,
            previous = 0;
        return function operate(...params) {
            let now = +new Date(),
                remaining = wait - (now - previous);
            if (remaining <= 0) {
                func.call(this, ...params);
                previous = +new Date();
                timer = clearTimer(timer);
            } else if (!timer) {
                timer = setTimeout(() => {
                    func.call(this, ...params);
                    previous = +new Date();
                    timer = clearTimer(timer);
                }, remaining);
            }
        };
    };

    /* 数组和对象的操作 */
    const mergeArray = function mergeArray(first, second) {
        if (typeof first === "string") first = Object(first);
        if (typeof second === "string") second = Object(second);
        if (!isArrayLike(first)) first = [];
        if (!isArrayLike(second)) second = [];
        let len = +second.length,
            j = 0,
            i = first.length;
        for (; j < len; j++) {
            first[i++] = second[j];
        }
        first.length = i;
        return first;
    };
    const each = function each(obj, callback) {
        let isArray = isArrayLike(obj),
            isObject = isPlainObject(obj);
        if (!isArray && !isObject) throw new TypeError('obj must be a array or likeArray or plainObject');
        if (!isFunction(callback)) throw new TypeError('callback is not a function');
        if (isArray) {
            for (let i = 0; i < obj.length; i++) {
                let item = obj[i],
                    index = i;
                if (callback.call(item, item, index) === false) break;
            }
            return obj;
        }
        let keys = Object.getOwnPropertyNames(obj);
        if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i],
                value = obj[key];
            if (callback.call(value, value, key) === false) break;
        }
        return obj;
    };
    const merge = function merge(...params) {
        let options,
            target = params[0],
            i = 1,
            length = params.length,
            deep = false,
            treated = params[length - 1];
        toType(treated) === 'set' ? length-- : treated = new Set();
        if (typeof target === "boolean") {
            deep = target;
            target = params[i];
            i++;
        }
        if (target == null || (typeof target !== "object" && !isFunction(target))) target = {};
        for (; i < length; i++) {
            options = params[i];
            if (options == null) continue;
            if (treated.has(options)) return options;
            treated.add(options);
            each(options, (copy, name) => {
                let copyIsArray = Array.isArray(copy),
                    copyIsObject = isPlainObject(copy),
                    src = target[name];
                if (deep && copy && (copyIsArray || copyIsObject)) {
                    if (copyIsArray && !Array.isArray(src)) src = [];
                    if (copyIsObject && !isPlainObject(src)) src = {};
                    target[name] = merge(deep, src, copy, treated);
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            });
        }
        return target;
    };
    const clone = function clone(...params) {
        let target = params[0],
            deep = false,
            length = params.length,
            i = 1,
            isArray,
            isObject,
            result,
            treated;
        if (typeof target === "boolean" && length > 1) {
            deep = target;
            target = params[1];
            i = 2;
        }
        treated = params[i];
        if (!treated) treated = new Set();
        if (treated.has(target)) return target;
        treated.add(target);
        isArray = Array.isArray(target);
        isObject = isPlainObject(target);
        if (target == null) return target;
        if (!isArray && !isObject && !isFunction(target) && typeof target === "object") {
            try {
                return new target.constructor(target);
            } catch (_) {
                return target;
            }
        }
        if (!isArray && !isObject) return target;
        result = new target.constructor();
        each(target, (copy, name) => {
            if (deep) {
                result[name] = clone(deep, copy, treated);
                return;
            }
            result[name] = copy;
        });
        return result;
    };

    /* 设定具备有效期的localStorage存储方案 */
    const storage = {
        set(key, value) {
            localStorage.setItem(key, JSON.stringify({
                time: +new Date(),
                value
            }));
        },
        get(key, cycle = 2592000000) {
            cycle = +cycle;
            if (isNaN(cycle)) cycle = 2592000000;
            let data = localStorage.getItem(key);
            if (!data) return null;
            let { time, value } = JSON.parse(data);
            if ((+new Date() - time) > cycle) {
                storage.remove(key);
                return null;
            }
            return value;
        },
        remove(key) {
            localStorage.removeItem(key);
        }
    };

    const utils = {
        toType,
        isFunction,
        isWindow,
        isArrayLike,
        isPlainObject,
        isEmptyObject,
        isNumeric,
        debounce,
        throttle,
        mergeArray,
        each,
        merge,
        clone,
        storage
    };

    /* 处理冲突 */
    if (typeof window !== "undefined") {
        let $ = window._;
        utils.noConflict = function noConflict() {
            if (window._ === utils) {
                window._ = $;
            }
            return utils;
        };
    }

    /* 导出API */
    if (typeof window !== "undefined") window.utils = window._ = utils;
    if (typeof module === "object" && typeof module.exports === "object") module.exports = utils;
})();