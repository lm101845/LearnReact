/*
  define([依赖的模块],function(用形参接收依赖的模块){
    写本模块中的代码

    return {
        把本模块中需要供外部调用的方法导出
    };
  })
 */
define(function () {
    let name = "A";
    const sum = function sum(...params) {
        let len = params.length,
            total = 0;
        if (len === 0) return 0;
        if (len === 1) return params[0];
        params.forEach(item => {
            total += item;
        });
        return total;
    };
    // 导出模块方法
    return {
        sum
    };
});