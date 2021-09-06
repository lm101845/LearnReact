/*
 * @Author: liming
 * @Date: 2021-09-06 23:07:48
 * @LastEditTime: 2021-09-06 23:42:36
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\08_ErrorBoundary\Parent.jsx
 */
import React, { Component } from 'react'
import Child from './Child'
export default class Parent extends Component {

    state = {
        hasError:''  //这个状态用于标识子组件是否产生错误
    }

    static getDerivedStateFromError(error) {
        //这个函数的意思是：如果这个Parent组件的子组件出现了任何的报错，那么都会调用这个钩子，而且调用的时候，它把错误给你传进来了
        console.log('@@@@@@@',error);
        return {hasError: error}
    }

    componentDidCatch() {
        //这个也是属于生命周期钩子里的一个，但是不常见。如果组件在渲染过程中，由于子组件出现错误，则会调用这个函数
        console.log('渲染组件出错');
        console.log('一般我们在这里进行错误统计，然后反馈给服务器，用于通知编码人员进行Bug的解决');
        console.log('注意：它只能捕获后代组件【生命周期】产生的错误');
    }
    render() {
        return (
            <div>
                <h2>我是Parent组件</h2>
                {/* <Child/> */}
                {/* 此时Child组件不要直接写了，先判断一下这个组件是否有错，如果没有才进行正常展示 */}
                {this.state.hasError ? <h2>当前网络不稳定，请稍后再试</h2> : <Child />}
                {/* 注意：这个错误边界只适用于生产环境！！！！！！！！！！！！！！！开发环境不能使用错误边界(最终还是会报错) */}
            </div>
        )
    }
}
