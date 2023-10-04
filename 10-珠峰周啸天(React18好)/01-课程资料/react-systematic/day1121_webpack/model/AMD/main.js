/* 全局配置 */
require.config({
    // 声明后期所有模块的导入，都在lib目录下找
    baseUrl: './lib'
});

require(['B', 'A'], function (B, A) {
    console.log(A.sum(10, 20, 30, 40));
    console.log(B.average(10, 20, 30, 40));
});