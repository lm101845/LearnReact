let name = "B";
/* 模块的导入：把模块导出的内容获取到，赋值给A */
const A = require('./A');
const average = function average(...params) {
    let len = params.length,
        total = 0;
    if (len === 0) return 0;
    total = A.sum(...params);
    return total / len;
};

/* 模块导出 */
module.exports = average;