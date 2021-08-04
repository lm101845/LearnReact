/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-03 01:59:26
 * @FilePath: \react-staging\src\App.js
 */

//创建"外壳"组件App
//这个js文件要使用React.Component就需要引入它
//这里我们使用类式组件(不使用函数式组件)

//写法1：
// import React from "react";
// const { Component } = React

// 写法2：
import React, { Component } from "react";
// React.Component这样写有点太麻烦,可以简写
// class App extends React.Component {
//注意：这不属于ES6的解构赋值，而是"react"这个文件里面肯定是用了多种暴露的形式

// import Hello from "./components/Hello/Hello"
// import Welcome from "./components/Welcome/Welcome"
import Hello from "./components/Hello"
import Welcome from "./components/Welcome"
// 优势：全部改名为index,index就可以省略不写了！！！
//弊端：它们名字都叫index，就容易混乱，分不清


//创建并暴露App组件
export default class App extends Component {
  render() {
    return (
        <div>
            {/* Hello React */}
            <Hello />
            <Welcome/>
        </div>
      // 一般我们不再这里直接写，我们建立一个Hello组件，把Hello组件放到这里才行
    );
  }
}

// export default App
//默认暴露App组件(必须要暴露，别人才能用)
// 不如直接在前面写
