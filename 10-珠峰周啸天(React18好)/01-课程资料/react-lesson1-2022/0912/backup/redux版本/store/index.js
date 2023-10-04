import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxLogger from 'redux-logger'; //在控制台输出派发日志
import reduxThunk from 'redux-thunk'; //实现异步派发
import reduxPromise from 'redux-promise'; //实现异步派发

const store = createStore(
    reducer,
    applyMiddleware(reduxLogger, reduxThunk, reduxPromise)
);
export default store;