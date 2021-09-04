/*
 * @Author: liming
 * @Date: 2021-08-30 18:10:19
 * @LastEditTime: 2021-09-05 00:24:50
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\store.js
 */

/**
 * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
 */

//引入createStore,专门用于创建redux中最为核心的store对象
import { createStore, applyMiddleware } from 'redux'

//引入汇总之后的reducer
import reducer from './reducers'

// 引入中间件redux-thunk,用于支持异步action
import thunk from 'redux-thunk'

//引入redux_devtools_extension
import { composeWithDevTools } from 'redux-devtools-extension'




//暴露store
// export default createStore(countReducer,applyMiddleware(thunk))
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

