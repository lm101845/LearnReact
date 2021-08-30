import React, { Component } from 'react'
import store from '../../redux/store'
// 引入store,用于获取redux中保存的状态
export default class Count extends Component {
 
    // 因为count我们已经用redux来管理了，所以这里我们不需要写state了
    // 但是如果你有state不需要redux来管理，还是完全可以写state的
    state = { carName: '奔驰c63' }
    // 这个carName我只在自己的组件里用，不用redux来管理
    // componentDidMount() {
    //     // 一个问题：如果你有几十个组件，那几十个组件都写componentDidMount,都晃它一下，也太冗余了
    //     // 你可以有一个更狠的方法：你不在这个组件里写，你在别的地方写(index.js)，只写一次，一劳永逸，你有3000个组件我都不怕

    //     //组件只要一挂载，我就做点默认的事情：监测redux中状态的变化，只要变化，我就调用render函数
    //     //第三个API(store.subscribe)
    //     // 它是一个方法，它里面传一个回调。
    //     // 这个回调函数什么时候执行？只要redux所保存的任何一个状态发生改变，都会调用render函数
    //     store.subscribe(() => {
    //         // console.log('@@@');
    //         // this.render()
    //         // 但是这样写不好使,render函数自己调用没用
    //         this.setState({})
    //         // 你这么写就可以了，你虽然里面啥也没写(你晃了它一下)，但是它看到后还是会帮你更新一下——它会调用render函数,帮你改状态
    //         // 你虽然什么也没改，它也是个傻子，它也  会帮你调用render
    //         // 缺点：setState它有效率上的问题
    //     })
    // }
    //加法
    increment = () => {
        const { value } = this.selectedNumber
        //用户的输入该获取还是获取
        //通过redux加value——第二个API(store.dispatch)
        // 注意：dispatch方法是在store身上的，不是在actions身上的
        store.dispatch({ type: 'increment',data:value*1})
        // 注意：count_reducer里面正在监视type,你所以这里的type名字必须是increment，你敢写错单词他就敢报错
    }
    //减法
    decrement = () => {
        const { value } = this.selectedNumber
        store.dispatch({ type: 'decrement',data:value*1})
    }
    // (当前求和)奇数再加
    incrementOdd = () => {
        const { value } = this.selectedNumber
        // const { count } = store.getState()
        // store.getState()它就是一个数字，所以不需要解构赋值
        const count  = store.getState()
        if (count % 2 !== 0) {
        store.dispatch({ type: 'increment',data:value*1})
            //store.dispatch就是你跟store进行对话
        }

    }
    incrementWait = () => {
        const { value } = this.selectedNumber
        setTimeout(() => {
            store.dispatch({ type: 'increment',data:value*1})      
        },500)
    }
    render() {
        return (
            <div>
                {/* <h1>当前求和为：{store}</h1> */}
                {/* store是一个对象，不能把这个展示到页面上！！！会报错：Objects are not valid as a React child  */}
                <h1>当前求和为：{store.getState()}</h1>
                {/* 第一个API(store.getState) */}
                <select ref={c => this.selectedNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                {/* 写个回调形式的ref */}
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementOdd}>当前求和为奇数再加</button>&nbsp;
                <button onClick={this.incrementWait}>等一会再加(异步加)</button>
                {/* 按住Alt键就能选好多 */}
            </div>
        )
    }
}
