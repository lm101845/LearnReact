// 定义B模块，但是需要用到A模块中的方法，所以最开始设置一下依赖
// 当后期加载B模块的时候，先把A模块导入「去lib下找A.js」，确保A模块导入后，再把后面的函数执行
define(['A'], function (A) {
    // A存储的就是A模块中导出的方法 -> {sum:function...}
    let name = "B";
    const average = function average(...params) {
        let len = params.length,
            total = 0;
        if (len === 0) return 0;
        total = A.sum(...params);
        return total / len;
    };

    // 模块导出
    return {
        average
    };
});