/**
 * @Author liming
 * @Date 2023/9/1 21:52
 **/

//合并reducer
import {combineReducers} from "redux";
import taskReducer from "./taskReducer";

const reducer = combineReducers({
    task:taskReducer
})

export default reducer
