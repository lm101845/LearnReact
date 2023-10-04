/*
 * @Author: liming
 * @Date: 2021-08-30 18:10:29
 * @LastEditTime: 2021-09-04 21:57:56
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\reducers\count.js
 */

import { INCREMENT, DECREMENT } from '../constant'
const initState = 0
export default function countReducer(preState = initState, action) {
    console.log('@@@countReducer@@@');
    const {
        type,
        data
    } = action
    //对action对象进行解构赋值

    switch (type) {
        case INCREMENT:
            return preState + data
        case DECREMENT: //如果是减
            return preState - data
        default:
            return preState

    }
}