define(['A'], function (AModules) {
    'use strict';
    let name = "B";
    const average = function average(...params) {
        if (params.length === 0) return 0;
        let total = AModules.sum(...params);
        return (total / params.length).toFixed(2);
    };


    /* 导出模块 */
    return {
        average
    };
});