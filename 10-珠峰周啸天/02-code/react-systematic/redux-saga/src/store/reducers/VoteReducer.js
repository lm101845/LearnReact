/**
 * @Author liming
 * @Date 2023/8/3 18:18
 **/


import _ from '@/assets/utils'
import * as TYPES from '../action-types'
const initial = {
    supNum:10,
    oppNum:5,
}
const VoteReducer = (state = initial, action) => {
    console.log('VoteReducer函数执行了')
    state = _.clone(true, state)   //将state进行深克隆
    switch (action.type) {
        case TYPES.VOTE_SUP:
            state.supNum ++
            break;
        case TYPES.VOTE_OPP:
            state.oppNum ++
            break;
        default:
    }
    return state
}

export default VoteReducer
