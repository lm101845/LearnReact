/**
 * @Author liming
 * @Date 2023/8/3 20:41
 **/

//vote板块要派发的行为对象管理
import * as TYPES from '../action-types'
//延迟函数，返回promise实例，在指定的时间后，才会让实例成功
const delay = (interval=1000)=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve()
        },interval)
    })
}

// let fn = async ()=>{
//     await delay()
//     return {x:100}
// }
// console.log(fn())
//promise<pending>
//fn函数执行后，只能拿到pending，拿不到对象，要一秒钟以后才能拿到，但是fn早就执行完了
//要想拿的话，要通过.then方法才能拿到
// fn().then(value=>{
//     console.log(value)
// })
const voteAction = {
    async support(){
        await delay()
        return {
            type:TYPES.VOTE_SUP
        }
    },
    oppose(){
        return {
            type:TYPES.VOTE_OPP
        }
    }
}

export default voteAction
