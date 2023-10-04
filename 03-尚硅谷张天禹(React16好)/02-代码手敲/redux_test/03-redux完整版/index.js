/*
 * @Author: liming
 * @Date: 2021-08-30 17:03:27
 * @LastEditTime: 2021-08-30 19:50:39
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
ReactDOM.render(<App />, document.getElementById('root'))

// 在这里一劳永逸的写，就不用在每个组件里写下面这些代码了：
    // componentDidMount() {
    //     store.subscribe(() => {
    //         this.setState({})
    //     })
    // }

    // 我在index里面就开始监测了，只要redux里面的状态发生任何变化,我都重新渲染App(App里面所有的子组件也会重新渲染)

    // 因为有DOM的diffing算法，所以效率问题不用担心
store.subscribe(() => {
    ReactDOM.render(<App />, document.getElementById('root'))
})