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
const voteAction = {
    support(){
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
