/*
 * @Author: liming
 * @Date: 2021-09-04 21:29:19
 * @LastEditTime: 2021-09-05 00:23:17
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\actions\person.js
 */
import { ADD_PERSON } from '../constant'

//创建增加一个人的action动作对象
export const addPerson = (personObj) => ({
    type: ADD_PERSON,
    data:personObj
})