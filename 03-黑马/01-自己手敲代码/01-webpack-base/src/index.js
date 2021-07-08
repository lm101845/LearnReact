// 1.导入包
import React from "react";
import ReactDOM from "react-dom";

let a = 10;
let str = '你好，中国'
let boo = true
let title = '999'

const h1 = <h1>哈哈哈</h1>

const arr = [
    <h2>这是h2</h2>,
    // 不要把<h2>想象成标签，要把它想象成数组里面的对象 
    <h3>这是h3</h3>
]

const arrStr = ['毛利', '柯南', '海贼王', '灰原哀']

// 定义一个空数组，将来用于存放名称标签
const nameArr = []
arrStr.forEach(item => {
    // 注意：forEach是没有返回值的
    const temp = <h5>{item}</h5>
    nameArr.push()
})

// 数组的map方法(必须要写return)
const result = arrStr.map(item => {
    return item + '~~~'
})
console.log(result);
// 调用render函数渲染
// JSX表示符合XML规范的JS代码，而XML要比HTML严格多了，所以这里hr后面必须要加封闭符号
// 什么情况下需要使用{}呢？当我们需要在JSX控制的区域内，写一些JS表达式，则需要把JS代码写到{}中
ReactDOM.render(<div>
    {a + 2}
    <hr />
    {str}
    <hr />
    {boo.toString()}
    <hr />
    {boo ? '条件为真' : '条件为假'}
    <hr />
    <p title="{title}">这是p标签</p>
    <hr />
    {h1}
    <hr />
    {arr}
    <hr />
    {arrStr}
    <hr />
    {nameArr}
    <hr />
    {/* {attStr.map(item => {
        return <h3>{item}</h3>
        
    })} */}
      {attStr.map(item => <h3>{item}</h3>)}
</div>, document.getElementById("app"));
// ReactDOM.render(mydiv, document.getElementById("app"));
// 前面省略了花括号的话，return也就不用再写了
