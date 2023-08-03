/**
 * @Author liming
 * @Date 2023/8/3 18:17
 **/

//合并各个模块的reducer,创建出一个总的reducer

import {combineReducers} from "redux";
import VoteReducer from "./VoteReducer";
import PersonalReducer from "./PersonalReducer";

const reducer = combineReducers({
    vote:VoteReducer,
    personal:PersonalReducer
})

export default reducer
