/*
 * @Author: liming
 * @Date: 2021-08-30 21:00:32
 * @LastEditTime: 2021-09-05 00:11:31
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\actions\count.js
 */
import {
    INCREMENT,
    DECREMENT
} from '../constant'

export const increment = data => ({
    type: INCREMENT,
    data
})
export const decrement = data => ({
    type: DECREMENT,
    data
})

export const incrementAsync = (data, time) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(increment(data))
        }, time)
    }
}

