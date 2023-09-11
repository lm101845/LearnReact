/**
 * @Author liming
 * @Date 2023/8/3 18:48
 **/
import {createStore,applyMiddleware} from "redux";
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
//saga函数是一个generator函数
const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(saga)
export default store
