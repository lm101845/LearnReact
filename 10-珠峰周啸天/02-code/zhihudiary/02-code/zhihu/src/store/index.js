/**
 * @Author liming
 * @Date 2023/9/7 9:40
 **/

import {createStore,applyMiddleware} from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reducer from './reducer'

//根据不同的环境，使用不同的中间件
let middleware = [reduxThunk,reduxPromise]
let env = process.env.NODE_ENV
// console.log(env,'环境env')

//开发环境下，才使用Log中间件
if(env === 'development'){
    middleware.push(reduxLogger)
}

//创建store容器
const store = createStore(reducer,applyMiddleware(...middleware))

export default store
