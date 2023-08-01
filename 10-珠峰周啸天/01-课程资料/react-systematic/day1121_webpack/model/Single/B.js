let BModule = (function () {
    let name = "B";
    // 在average获取平均数的方法中，我们需要用到A模块中的求和方法
    const average = function average(...params) {
        let len = params.length,
            total = 0;
        if (len === 0) return 0;
        total = AModule.sum(...params);
        return total / len;
    };

    return {
        average
    };
})();