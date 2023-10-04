/**
 * @Author liming
 * @Date 2023/9/7 9:40
 **/
//合并reducer(使用特定API-combineReducers)
import {combineReducers} from "redux";
import baseReducer  from "./base";
import storeReducer from './store'

const reducer = combineReducers({
    base:baseReducer,
    store:storeReducer
})

export default reducer
