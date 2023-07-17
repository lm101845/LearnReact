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
};