import React, { Component } from 'react'
// import Count from './components/Count'
// 这个时候不应该引入Count UI组件了，而是应该引入Count容器组件
import Count from './containers/Count'
// import store from './redux/store'
export default class App extends Component {
    render() {
        return (
            <div>
                {/* 这里是在渲染容器组件，并且给容器组件传东西了(store) */}
                {/* <Count store={store}/> */}
                <Count />
                {/* 这里我不在App里面引入store了，我找App的上一层，就是index.js，我在入口文件里引入store */}
                {/* <Demo1 store={store}/>
                <Demo2 store={store}/>
                <Demo3 store={store}/>
                <Demo4 store={store}/>
                <Demo5 store={store}/> */}
                {/* 容器里的store不能我自己亲手引入，而要必须得在上一层(App)，通过props的形式传递给它*/}
                {/* 如果我有很多Demo容器组件，每个组件都要这么传，就很不好 */}
            </div>
        )
    }
}
