/* 全局配置 */
require.config({
    baseUrl: './lib'
});

require(['B', 'A'], function (BModules, AModules) {
    console.log('求和：', AModules.sum(10, 20, 30, 40));
    console.log('求平均：', BModules.average(10, 20, 30, 40));
});