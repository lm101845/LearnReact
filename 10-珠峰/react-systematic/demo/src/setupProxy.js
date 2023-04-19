/**
 * @Author liming
 * @Date 2023/4/19 17:56
 **/

const {createProxyMiddleware} =  require('http-proxy-middleware')

module.exports = function (app){
    app.use(createProxyMiddleware("/jian",{
        target:'https://www/jianshu.com/asiov',
        changeOrigin: true,
        ws: true,
        pathRewrite:{"^/jian":""}
    }));

    app.use(createProxyMiddleware("/zhi",{
        target:'https://news-at.zhihu.com/api/4',
        changeOrigin: true,
        ws: true,
        pathRewrite:{"^/zhi":""}
    }));
}