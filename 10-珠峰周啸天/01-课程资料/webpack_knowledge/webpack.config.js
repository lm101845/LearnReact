/* 
 * 基于CommonJS模块规范，导出自定义的打包规则 
 *  @1 mode打包模式：开发环境（development）、生产环境（production）
 *     + 开发环境“默认”打包后的代码是不压缩的(我们可以自己找插件实现压缩)，而生产环境是压缩的
 *     + 默认设置一个环境变量：NODE_ENV
 *       在JS中可以获取这个变量 const env = process.env.NODE_ENV;
 *       + development
 *       + production
 *     + ...
 *  @2 entry入口
 *  @3 output出口
 *  @4 plugin插件：主要用于处理(或优化)打包
 *  @5 loader加载器：主要用于实现代码的编译和检测
 *  @6 其他的配置
 *    + resolve解析器
 *    + optimization优化项
 *    + cache缓存处理
 *    + devtool控制 source map 的生成
 *    + target配置浏览器的兼容
 *    + ...
 *  @7 DevServer：启动本地服务，预览开发的项目和实现跨域代理
 *  ...
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    /* 基础配置 */
    mode: 'production',
    entry: './src/index.js',
    output: {
        // 指定打包后的文件名「hash:根据内容自动生成哈希值,这样可以清除强缓存的影响」
        filename: 'main.[hash:8].js',
        // 控制打包后文件的路径「需要是绝对路径」
        path: path.resolve(__dirname, './dist')
    },
    /* 插件 */
    plugins: [
        // 打包处理HTML页面
        new HtmlWebpackPlugin({
            // 指定页面模板
            template: './public/index.html',
            // 打包后的页面名称
            filename: 'index.html',
            // 设置页面的标题
            title: "珠峰培训-webpack",
            // 设置导入资源的路径前缀「例如：设置CDN统一地址」
            publicPath: './'
        }),
        // 清除之前打包内容
        new CleanWebpackPlugin(),
        // 提取CSS代码
        new MiniCssExtractPlugin({
            // 指定打包后CSS文件的名字
            filename: 'main.[hash:8].css'
        })
    ],
    /* 加载器 */
    module: {
        rules: [
            /* 处理CSS的加载器 */
            {
                // 匹配哪些文件采用此规则
                test: /\.(css|less)/i,
                // 使用了多个加载器，处理顺序：从下到上
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ],
                exclude: /node_modules/
            },
            /* 处理JS的加载器 */
            {
                test: /\.(js|jsx)/i,
                use: [
                    'babel-loader'
                ],
                // 设置编译的忽略项
                // include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/
            },
            /* 处理图片的加载器 */
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        // 200KB以内的图片，直接给BASE64了
                        limit: 200 * 1024,
                        // 图片都放在images目录下
                        outputPath: '/images'
                    }
                }]
            },
            {
                test: /\.(svg|eot|ttf|woff|woff2)$/i,
                use: "file-loader"
            }
        ]
    },
    /* 优化项 */
    optimization: {
        // 压缩文件
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    },
    /* 配置DEV-SERVER */
    devServer: {
        // 本地启动服务器的配置
        port: 3000,
        host: '127.0.0.1',
        open: true,
        hot: true,
        // 实现跨域代理
        proxy: {
            "/api": {
                target: "https://news-at.zhihu.com/api/4",
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            },
            "/jianshu": {
                target: "https://www.jianshu.com/asimov",
                changeOrigin: true,
                pathRewrite: { '^/jianshu': '' }
            }
        }
    },
    performance: {
        maxAssetSize: 100000000,
        maxEntrypointSize: 100000000
    }
};