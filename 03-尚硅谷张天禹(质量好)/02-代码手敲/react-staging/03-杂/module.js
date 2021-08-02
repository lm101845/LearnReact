/*
 * @Author: liming
 * @Date: 2021-08-03 00:59:10
 * @LastEditTime: 2021-08-03 01:01:57
 * @FilePath: \react-staging\src\module.js
 */
const React = { a: 1, b: 2 }
//首先定义一个React对象

//写法1：
// class Component {
    
// }

// React.Component = Component
//再给这个React对象身上追加一个Component属性，它的值是Component类
//此时React身上至少有3个属性：a,b,还有component

//写法2：
React.Component = class Component {
    
}

export default React

