//对ES6内置API做兼容性处理
import 'react-app-polyfill/ie11'   //这个表示可以兼容到ie11
import 'react-app-polyfill/ie9'   //这个表示可以兼容到ie11
import 'react-app-polyfill/stable'   //这个表示可以兼容到ie11
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.less'

// import {createElement} from './jsxHandle'
//创建的js文件，把后缀名设置为jsx，这样js文件中就可以支持jsx语法了
//在createRoot的时候，不能直接把HTML/Body作为根容器，需要指定一个额外的盒子，例如#root
const root = ReactDOM.createRoot(document.getElementById('root'));

//boolean/null/undefined/Symbol/BigInt：渲染的内容是空
//数组对象：把数组的每一项都分别拿出来渲染【并不是变成字符串渲染，中间没有逗号】
//除数组对象外，其余对象一般都不支持直接在{}中进行渲染，但是也有特殊情况：
//    +JSX虚拟DOM对象
//    +给元素设置style行内样式，要求必须写成一个对象格式
//函数对象：不支持在{}中渲染，但是可以作为函数组件，用<Component/>方式渲染
//设置样式类名，需要把class替换为className
// let text = '珠峰培训11'
// let text = true
// let text = [10,20]
let text = [10,20]
//每一个构建的视图，只能有一个根结点，出现多个根结点，则会报错
// Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?
let flag = false;
let isRun = true;
// root.render(
//    <>
//        {/*需求一*/}
//        <div>{text}</div>
//        <button className='box' style={{display:flag? 'block':'none'}}>不能有2个根结点</button>
//        <h2 style={{color: 'red',fontSize: '18px'}}>我在学习React</h2>
//         {/*控制元素渲染或不渲染*/}
//         <br/>
//
//         {flag ? <button>按钮2</button> : null}
//        <br/>
//        <button>{isRun ? '正在处理中':'立即提交注册'}</button>
//    </>
// );

//需求二：从服务器获取一组列表数据，循环绑定相应内容
let data = [{
    id:1,
    title:'你好'
},{
    id:2,
    title:'我好'
},{
    id:3,
    title:'大家好'
}]
root.render(
    <>
        <h2 className="title">今日新闻</h2>
        <ul className="news-box">
            {data.map((item,index)=>{
                return <li key={item.id}>
                    <em>{index + 1}</em>
                     &nbsp;&nbsp;
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        {[1,2,3]}
        {/*胡子语法中，不能嵌入除数组以外的其他对象，但是有一个对象是可以直接嵌入的：JSX元素对象[虚拟DOM对象]*/}
        {/*我们可以基于createElement语法构建视图，但是这样做比较麻烦*/}
    </>
)
// fetch('/jian/subscriptions/recommended_collections').then(res=>res.json()).then(value => {
//     console.log(value,'简书value')
// })
//
// fetch('/zhi/news/latest').then(res=>res.json()).then(value => {
//     console.log(value,'知乎value')
// })
