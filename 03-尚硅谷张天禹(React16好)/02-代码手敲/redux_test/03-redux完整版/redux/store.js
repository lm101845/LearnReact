/*
 * @Author: liming
 * @Date: 2021-08-30 18:10:19
 * @LastEditTime: 2021-08-30 18:21:35
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\store.js
 */

/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */
//引入createStore,专门用于创建redux中最为核心的store对象
// redux里面有一个方法叫createStore
import { createStore } from 'redux'

//引入为Count组件服务的reducer——reducer一般用默认暴露
import countReducer from './count_reducer'

// const store = {}
// store是餐馆老板，你在创建store的时候就已经指定了reducer(后厨)为store卖命了

// 完整写法：
// const store = createStore(countReducer)

// export default store
// 因为是一个js文件，所以用默认暴露比较好

// 简写
export default createStore(countReducer)

// store确实很重要，但是你没有自己写，直接createStore就出来了