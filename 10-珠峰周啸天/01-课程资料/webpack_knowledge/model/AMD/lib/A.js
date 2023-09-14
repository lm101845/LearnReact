/* 创建模块 */
define(function () {
    'use strict';
    let name = 'A';
    const sum = function sum(...params) {
        let len = params.length,
            total = 0;
        if (len === 0) return 0;
        if (len === 1) return params[0];
        params.forEach(item => {
            total += +item;
        });
        return total;
    };

    /* 模块导出 */
    return {
        sum
    };
});