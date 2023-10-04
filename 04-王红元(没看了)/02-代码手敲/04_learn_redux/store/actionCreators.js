/**
 * @Author liming
 * @Date 2022/11/14 21:25
 **/
import {
        ADD_NUMBER,
        SUB_NUMBER,
        INCREMENT,
        DECREMENT
} from './constants.js';
//
// export function addAction(num){
//     return {
//         type:'ADD_NUMBER',
//         num
//     }
// }

//一定要记得加上小括号
export const addAction = num =>({
        type:ADD_NUMBER,
        num
})

export const subAction = num =>({
        type:SUB_NUMBER,
        num
})

export const incAction = () => ({
        type: INCREMENT
});

export const decAction = () => ({
        type: DECREMENT
});