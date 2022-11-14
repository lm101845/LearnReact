/**
 * @Author liming
 * @Date 2022/11/14 21:15
 **/
import {
    ADD_NUMBER,
    SUB_NUMBER,
    INCREMENT,
    DECREMENT
} from './constants.js';

const defaultState = {
    counter: 0
}

function reducer(state=defaultState,action){
    switch (action.type){
        case INCREMENT:
            return {...state,counter:state.counter + 1}
        //一定要这样写，不能直接修改state的值
        case "DECREAMENT":
            return {...state,counter:state.counter - 1}
        case "ADD_NUMBER":
            return {...state,counter:state.counter + action.num}
        case "SUB_NUMBER":
            return {...state,counter:state.counter - action.num}
        default:
            return state;
    }
}

export default reducer