/**
 * @Author liming
 * @Date 2023/8/3 18:17
 **/


import {combineReducers} from "redux";
import VoteReducer from "./VoteReducer";
import demoReducer from "./demoReducer";

const reducer = combineReducers({
    vote:VoteReducer,
    demo:demoReducer
})

export default reducer
