/*
 * @Author: liming
 * @Date: 2021-08-30 21:00:32
 * @LastEditTime: 2021-09-04 09:58:13
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\count_action.js
 */
/**
 * 该文件专门为Count组件生成action对象
 * 注意：action不仅可以是【一般对象——同步action】，还可以是【函数——异步action】！！！
 * action有同步与异步之分。
 */

// function createIncrementAction(data) {
//     return { type: 'increment', data}
//     // 你创建的都是加的action，所以type肯定都是increment
// }

// function createDecrementAction(data) {
//     return { type: 'decrement', data}
//     // 你创建的都是加的action，所以type肯定都是increment
// }

// 上面这样写有点麻烦，写成箭头函数的形式
// 写法1：
// const createIncrementAction = data=> {
//     return { type: 'increment', data}
//     // 你创建的都是加的action，所以type肯定都是increment
// }

// const createDecrementAction = data=> {
//     return { type: 'decrement', data}
//     // 你创建的都是加的action，所以type肯定都是increment
// }
import {
    INCREMENT,
    DECREMENT
} from './constant'

// import store from '../redux/store'


// 写法2——并且采用分别暴露的方式
// 所谓的同步action,就是指action的值为Object类型的一般对象
// 注意：箭头函数小括号花括号【({})】表示是有返回值的
export const createIncrementAction = data => ({
    type: INCREMENT,
    data
})
export const createDecrementAction = data => ({
    type: DECREMENT,
    data
})
// 所谓的异步action就是指action的值为函数——注意：异步action中一般都会调用同步action
// 异步action不是必须要用的，看你业务场景
export const createIncrementAsyncAction = (data, time) => {
    // return () => {
    return (dispatch) => {
        // 写法1：引入store
        // setTimeout(() => {
        //     //在这里干一件事情就行：【通知——使用store.dispatch】redux加上data
        //     // store.dispatch({type: INCREMENT,data})
        //     // 不用自己亲自去写对象，你有手下的
        //     store.dispatch(createIncrementAction(data))
        //     // 你先通过中间件【央求】store来执行一下你这个函数，【执行完setTimeout后——目的达到】，这才告诉store我要调用这个【同步函数】
        //     /*
        //      * 但是报错了：——store默认不允许使用function,函数里面也没有type,也没有data，它就不会处理
        //      * Error: Actions must be plain objects. Instead, the actual type was: 'function'.
        //      *  You may need to add middleware(需要用中间件！！！名字叫redux-thunk) to your store setup to handle dispatching other values,
        //      *  such as 'redux-thunk' to handle dispatching functions. 
        //      */
        // }, time)

        
        // 写法2：不引入store
        setTimeout(() => {
            // 人家知道你肯定用dispatch，所以帮你传过来了
            dispatch(createIncrementAction(data))
        }, time)
    }
    // 我得返回【函数类型】才能叫异步action
    // 因为只有【函数类型】才能为你开启一个异步任务
}

//Count组件中的store.dispatch({ type: 'increment', data: value * 1 }),是自己亲自动手写action对象
//现在有了action对象了，就不用自己亲自写了