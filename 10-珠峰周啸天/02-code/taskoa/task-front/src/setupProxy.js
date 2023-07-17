const {createProxyMiddleware} =  require('http-proxy-middleware')

module.exports = function (app){
    app.use(createProxyMiddleware("/api",{
        target:'https://127.0.0.1:9000',
        changeOrigin: true,
        ws: true,
        pathRewrite:{"^/api":""}
    }));
}
