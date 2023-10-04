/* 处理ES6内置API的兼容 */
import '@babel/polyfill';

/* 项目中需要用到的CSS，我们在入口中基于模块规范导入进来 */
import '@/assets/css/reset.min.css';
import '@/index.less';

import sum from "@/A";
import average from "@/B";
console.log(sum(10, 20, 30, 40, 50));
console.log(average(10, 20, 30, 40));

/* 先页面中动态插入图片 */
// JS中处理静态图片，需要先基于ES6Module规范导入进来「这样webpack才会对此图片进行打包」
// 如果写的是相对地址，打包后还是这个地址，但是打包后的资源路径全都变了「不是SRC这样的路径了」，所以肯定找不到图片；但是设置的是绝对地址（外部网址那种的），无需先import导入，直接写地址即可{无需经过webpack打包}！！
import temp from '@/assets/images/boy.jpg';
let img = new Image;
img.src = temp;
document.body.appendChild(img);

/* new Promise(() => { }); */

/* fetch("/jian/subscriptions/recommended_collections")
    .then(response => response.json())
    .then(value => {
        console.log('简书：', value);
    });
fetch("/zhi/news/latest")
    .then(response => response.json())
    .then(value => {
        console.log('知乎', value);
    }); */