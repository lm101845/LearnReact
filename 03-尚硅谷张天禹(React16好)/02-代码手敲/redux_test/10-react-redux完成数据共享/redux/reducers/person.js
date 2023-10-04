/*
 * @Author: liming
 * @Date: 2021-09-04 21:34:08
 * @LastEditTime: 2021-09-04 22:39:26
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\reducers\person.js
 */
import { ADD_PERSON } from '../constant'

//初始化人的列表
const initState = [{ id: '001', name: 'tom', age: 18 }]

export default function personReducer(preState = initState, action) {
    // console.log('@@@personReducer@@@');
    const { type, data } = action
    //data是ations里面通过createAddPersonAction给你创建的personObj对象
    switch (type) {
        case ADD_PERSON:  //若是添加一个人
            return [data, ...preState]
        default:
            return preState 
    }
}