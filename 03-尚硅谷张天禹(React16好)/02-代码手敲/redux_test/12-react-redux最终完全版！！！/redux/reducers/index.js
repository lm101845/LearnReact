/*
 * @Author: liming
 * @Date: 2021-09-05 00:03:25
 * @LastEditTime: 2021-09-05 00:26:19
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\reducers\index.js
 */

// 该文件用于汇总所有的reducer为一个总的reducer,它只做这一件事情！！！汇总之后交出去

//引入combineReducers用于汇总多个reducer
import { combineReducers } from 'redux'

//引入为Count组件服务的reducer——reducer一般用默认暴露
import count from './count'
//引入为Person组件服务的reducer——reducer一般用默认暴露
import persons from './person'
// 你需要再经历一个环节：合并reducer——使用combineReducers

export default combineReducers({
    // 一组一组的key-value(key随便起)
    count,
    persons
})

