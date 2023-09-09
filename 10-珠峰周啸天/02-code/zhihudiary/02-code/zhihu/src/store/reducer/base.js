/**
 * @Author liming
 * @Date 2023/9/7 9:41
 **/
import * as TYPES from '../action-types'
import _ from '../../assets/utils'
let initial = {
    info:null
}

export default function baseReducer(state=initial,action){
    state = _.clone(state)
    //Reducer 是纯函数，它接收之前的 state 和 action，并返回新的 state。记住，一定要返回一个新的对象，而不是修改之前的 state。
    switch (action.type){
        //更新登陆者信息
        case TYPES.BASE_INFO:
            state.info = action.info
            //把从服务器获取到的信息替换当前状态
            break
        default:
    }
    return state
}
