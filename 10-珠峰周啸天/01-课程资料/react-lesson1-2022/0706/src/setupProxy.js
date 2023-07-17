/* 实现跨域代理 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'https://www.jianshu.com/asimov',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    );
    app.use(
        createProxyMiddleware('/zhihu', {
            target: 'https://news-at.zhihu.com/api/4',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/zhihu': ''
            }
        })
    );
};