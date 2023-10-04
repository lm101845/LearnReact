/**
 * @Author liming
 * @Date 2023/8/3 18:48
 **/
import {createStore,applyMiddleware} from "redux";
import reducer from './reducers'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
const store = createStore(reducer,applyMiddleware(reduxLogger,reduxThunk,reduxPromise))

export default store
