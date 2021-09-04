/*
 * @Author: liming
 * @Date: 2021-08-30 21:00:32
 * @LastEditTime: 2021-09-04 20:39:43
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\actions\count_action.js
 */
import {
    INCREMENT,
    DECREMENT
} from '../constant'

export const createIncrementAction = data => ({
    type: INCREMENT,
    data
})
export const createDecrementAction = data => ({
    type: DECREMENT,
    data
})

export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(createIncrementAction(data))
        }, time)
    }
}

