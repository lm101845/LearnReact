/**
 * @Author liming
 * @Date 2023/9/1 21:52
 **/

import {createStore,applyMiddleware} from "redux";
import reducer from "./reducers";
import reduxLogger from 'redux-logger'
import reduxPromise from 'redux-promise'
import reduxThunk from 'redux-thunk'

const store = createStore(reducer,applyMiddleware(reduxLogger,reduxPromise,reduxThunk))

export default store
