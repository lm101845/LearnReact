const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 前提：我们设置的名字和src/public中入口及页面模板的名字相同，打包后文件也想基于这个命名
const pageArr = ["index", "login", "personal"],
    entryObj = {},
    htmlPlugins = [];
pageArr.forEach(chunk => {
    entryObj[chunk] = `./src/${chunk}.js`;
    htmlPlugins.push(
        new HtmlWebpackPlugin({
            // 指定页面模板
            template: `./public/${chunk}.html`,
            // 打包后文件的名字
            filename: `${chunk}.html`,
            // 是否压缩
            minify: true,
            // 指定导入的资源名称
            chunks: [chunk]
        })
    );
});

module.exports = {
    /* 基础配置 */
    mode: 'production',
    // 配置多入口
    entry: entryObj,
    // 出口可以使用相同的规则：需要基于[name]打包不同的文件
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, './dist')
    },
    /* 使用插件 */
    plugins: [
        ...htmlPlugins,
        // 清除之前打包的内容
        new CleanWebpackPlugin()
    ]
};