/* 模块导入：sum => Module对象.default */
import sum from './A.js';

let name = "B";
const average = function average(...params) {
    let len = params.length,
        total = 0;
    if (len === 0) return 0;
    total = sum(...params);
    return total / len;
};

/* 模块导出 */
export default average; //Module对象{ default:average函数 }