/**
 * @Author liming
 * @Date 2023/9/13 9:06
 **/
import { defineConfig } from "umi";
import routes from './routes'
export default defineConfig({
    devtool:process.env.NODE_ENV === 'development' ? 'eval' : false,  //关闭所有环境下的sourcemap
    hash:true,
    npmClient: 'pnpm',
    externals:{},   //配合headscripts可以把项目中一些第三方模块，单独在html中进行导入[导入的可以是cdn地址]以此减少打包后Js的大小
    headScripts:[],
    links:[],
    metas:[],
    title:'珠峰培训-umi',
    //基于链式写法，修改webpack配置项
    chainWebpack(memo,{env,webpack}){
        //memo:现有的webpack配置项
        //env:环境变量 webpack:webpack对象
    },
    //额外的扩展项
    extraBabelPlugins:[],
    extraBabelPresets:[],
    extraPostCSSPlugins:[],
    // //有关于路由的处理
    history:{
        type:'hash'
    },
    historyWithQuery:{},
    routes, //使用约定式路由[路由表模式]
    ignoreMomentLocale:false,
    inlineLimit:10000,      //多大(10kb)以内的图片，自动base64
    jsMinifier: 'terser',   //设置JS压缩方式,默认是esbuild
    jsMinifierOptions:{},
    //设置umi的插件
    plugins:[],
    //设置打包后资源的导入路径(默认是'./',也可以设置CDN)
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    //浏览器兼容处理(默认全量导入polyfill来处理ES6 API的兼容，也可以手动按需导入)
    polyfill:{},
    // //设置需要兼容的最低版本浏览器
    targets:{
        ie:11
    },
    //跨域代理
    proxy:{
        '/api':{
            target:'',
            changeOrigin:true,
            pathRewrite:{'^api':''}
        }
    },
});
