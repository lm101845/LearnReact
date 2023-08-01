const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    /* 基础配置 */
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    /* 优化项 */
    optimization: {
        // 设置压缩方式
        minimizer: [
            new CssMinimizerWebpackPlugin(),
            new TerserPlugin()
        ]
    },
    /* 使用插件 */
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            minify: true
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // 打包后CSS文件的名字
            filename: 'main.[hash:8].css'
        })
    ],
    /* DEV-SERVER */
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        proxy: {
            "/jian": {
                target: "https://www.jianshu.com/asimov",
                changeOrigin: true,
                ws: true,
                pathRewrite: { "^/jian": "" }
            },
            "/zhi": {
                target: "https://news-at.zhihu.com/api/4",
                changeOrigin: true,
                ws: true,
                pathRewrite: { "^/zhi": "" }
            }
        }
    },
    /* LOADER加载器：执行顺序 下->上、右->左 */
    module: {
        rules: [{
            test: /\.(css|less)$/, //基于正则匹配：哪些文件是我们需要处理的
            use: [
                MiniCssExtractPlugin.loader, //抽离CSS代码的
                // "style-loader", //把CSS以内嵌式导入到页面
                "css-loader", //处理特殊语法
                "postcss-loader", //配合autoprefixer&browserslist给CSS3属性设置前缀「兼容」
                "less-loader" //把less编译为css
            ]
        }, {
            test: /\.js$/,
            use: [
                "babel-loader"
            ],
            // 设置编译时忽略的文件和指定编译目录「优化处理」
            // include: path.resolve(__dirname, 'src'),
            exclude: /node_modules/
        }, {
            test: /\.(png|jpe?g|gif)$/i,
            type: 'javascript/auto', //webpack5需要的
            use: [{
                loader: 'url-loader',
                options: {
                    // 把指定大小内的图片BASE64「<=200KB则需要BASE64」
                    limit: 200 * 1024,
                    esModule: false,
                    // 编译后，没有BASE64的图片，编译输出的路径和名称
                    name: 'images/[name].[hash:8].[ext]'
                }
            }]
        }]
    },
    /* 设置打包的最大资源大小 */
    performance: {
        maxAssetSize: 100 * 1024 * 1024,
        maxEntrypointSize: 100 * 1024 * 1024
    },
    /* 解析器 */
    resolve: {
        alias: {
            // @以后代表的就是SRC这个路径
            '@': path.resolve(__dirname, './src')
        }
    }
};


/* 
 浏览器兼容处理
   设置browserslist「浏览器兼容列表」
     https://github.com/browserslist/browserslist

   @1 考虑CSS3样式的兼容问题
     postcss-loader & autoprefixer
     根据browserslist，自动给CSS3加相关的前缀

   @2 考虑JS的兼容性
     ES6+语法兼容：把ES6+语法转换为ES5的语法
       babel & babel-loader & @babel/preset-env & @babel/core & browserslist
     ES6+内置API的兼容：上述操作处理不了，需要导入@babel/polyfill「对常见的内置API进行了重写」
       不是所有API都重写了，例如：fetch/Reflect等就没有重写！！
*/