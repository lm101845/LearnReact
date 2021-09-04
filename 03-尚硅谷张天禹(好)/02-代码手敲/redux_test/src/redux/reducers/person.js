/*
 * @Author: liming
 * @Date: 2021-09-04 21:34:08
 * @LastEditTime: 2021-09-04 23:30:19
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\reducers\person.js
 */
import { ADD_PERSON } from '../constant'

//初始化人的列表
const initState = [{ id: '001', name: 'tom', age: 18 }]

export default function personReducer(preState = initState, action) {
    // redux要求personReducer必须是一个【纯函数】——不靠谱的事情纯函数里面不能做
    // console.log('@@@personReducer@@@');
    const { type, data } = action
    //data是ations里面通过createAddPersonAction给你创建的personObj对象
    switch (type) {
        case ADD_PERSON:  //若是添加一个人
            // console.log('@');
            // preState.unshift(data)
            // console.log(preState);
            // return preState  //这样写,页面没有更新
            return [data, ...preState]
            //[data, ...preState]这个数组和原先数组不是一个数组，所以页面更新了
            //所以React中我们很少用push,unshift这些操作数组的方法
        default:
            return preState 
    }
}