/*
 * @Author: liming
 * @Date: 2021-08-30 18:10:19
 * @LastEditTime: 2021-09-04 22:22:03
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\store.js
 */

/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore,专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware,combineReducers } from 'redux'
//引入为Count组件服务的reducer——reducer一般用默认暴露
import countReducer from './reducers/count'

//引入为Person组件服务的reducer——reducer一般用默认暴露
import personReducer from './reducers/person'

// 你需要再经历一个环节：合并reducer——使用combineReducers

// 引入中间件redux-thunk,用于支持异步action
import thunk from 'redux-thunk'
//暴露store
// export default createStore(countReducer, personReducer, applyMiddleware(thunk))
// 不能这么写

//汇总所有的reducer,变为一个总的reducer
const allReducer = combineReducers({
    // 一组一组的key-value(key随便起)
    he: countReducer,
    rens: personReducer
})
export default createStore(allReducer,applyMiddleware(thunk))
// export default createStore(countReducer,applyMiddleware(thunk))

