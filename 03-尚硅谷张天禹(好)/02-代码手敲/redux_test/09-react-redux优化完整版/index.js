/*
 * @Author: liming
 * @Date: 2021-08-30 17:03:27
 * @LastEditTime: 2021-09-04 10:29:39
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\index.js
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'
// 这个Provider是react-redux里提供的API,它可以做的事情：
// 如果组件里面有100个容器组件，这100个容器组件都需要store，兄弟你不要这么累，一个一个传，你把它们中都需要用到的store都交给Provider
// Provider拿到store之后，会自动分析应用中所有的容器组件，把store精准的传给每一个store的容器组件

// import store from './redux/store'
// 引入store的原因——下面的store.subscribe需要它
// 而使用了react-redux插件后，就不需要store.subscribe了，它可以自动监测状态变化
ReactDOM.render(
    // <App />,
    <Provider store={store}>
        <App />
    </Provider>,
    // 我们为什么渲染App呢？因为它是所有组件的外壳组件，只要渲染了App，所有的子组件都出来了
    document.getElementById('root')
)

// 在这里一劳永逸的写，就不用在每个组件里写下面这些代码了：
    // componentDidMount() {
    //     store.subscribe(() => {
    //         this.setState({})
    //     })
    // }

    // 我在index里面就开始监测了，只要redux里面的状态发生任何变化,我都重新渲染App(App里面所有的子组件也会重新渲染)

    // 因为有DOM的diffing算法，所以效率问题不用担心
    // 监测redux中状态的改变，若redux中的状态发生了改变，那么重新渲染App组件

    
// store.subscribe(() => {
//     ReactDOM.render(<App />, document.getElementById('root'))
// })

// react-redux的一个更好的地方，不需要我们写store.subscribe了,而是它可以自动监测状态发生改变了