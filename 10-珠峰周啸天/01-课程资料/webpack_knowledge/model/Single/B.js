let BModules = (function () {
    let name = "B";
    const average = function average(...params) {
        if (params.length === 0) return 0;
        let total = AModules.sum(...params);
        return (total / params.length).toFixed(2);
    };

    /* 模块的导出 */
    return {
        average
    };
})();