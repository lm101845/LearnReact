import React, { Component } from 'react'
// import Count from './components/Count'
// 这个时候不应该引入Count UI组件了，而是应该引入Count容器组件
import Count from './containers/Count'
import store from './redux/store'
export default class App extends Component {
    render() {
        return (
            <div>
                {/* 这里是在渲染容器组件，并且给容器组件传东西了(store) */}
                <Count store={store}/>
                {/* 容器里的store不能我自己亲手引入，而要必须得在上一层(App)，通过props的形式传递给它*/}
            </div>
        )
    }
}
