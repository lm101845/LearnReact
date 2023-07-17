const env = process.env.NODE_ENV;
const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: './',
  productionSourceMap: false,
  transpileDependencies: false,
  lintOnSave: env !== 'production',
  devServer: {
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7100',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
});