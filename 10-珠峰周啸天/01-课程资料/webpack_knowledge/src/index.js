import '@babel/polyfill';
import sum from "./A";
import average from "./B";
// 项目中使用的样式
import './assets/css/reset.min.css';
import './index.less';
// 动态创建图片
import boy from './assets/images/boy.jpg';
const imgBox = new Image;
// imgBox.src = './assets/images/boy.jpg'; //不能使用本地静态文件的相对地址「因为打包后，文件的目录全都变了」，可以使用外网的绝对地址！！
imgBox.src = boy;
document.querySelector('#root').appendChild(imgBox);

let p1 = new Promise(() => { });
console.log('求和：', sum(10, 20, 30, 40));
console.log('求平均：', average(10, 20, 30, 40));
console.log(p1);

fetch('/api/news/latest')
    .then(response => response.json())
    .then(value => {
        console.log('知乎：', value);
    });
fetch('/jianshu/subscriptions/recommended_collections')
    .then(response => response.json())
    .then(value => {
        console.log('简书：', value);
    });