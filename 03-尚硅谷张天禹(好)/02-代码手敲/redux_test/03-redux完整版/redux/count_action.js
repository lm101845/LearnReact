/*
 * @Author: liming
 * @Date: 2021-08-30 21:00:32
 * @LastEditTime: 2021-08-30 21:28:23
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\count_action.js
 */
/**
 * 该文件专门为Count组件生成action对象
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
import {INCREMENT,DECREMENT } from './constant'


// 写法2——并且采用分别暴露的方式
export const createIncrementAction = data => ({type: INCREMENT, data}) 
export const createDecrementAction = data => ({ type: DECREMENT, data })

//Count组件中的store.dispatch({ type: 'increment', data: value * 1 }),是自己亲自动手写action对象
//现在有了action对象了，就不用自己亲自写了
