/**
 * @Author liming
 * @Date 2023/8/3 18:18
 **/

//Vote板块下的reducer
import _ from '@/assets/utils'
import * as TYPES from '../action-types'
const initial = {
    supNum:10,
    oppNum:5,
    num:0
}
const VoteReducer = (state = initial, action) => {
    /**
     * 在Redux中，reducer是一个纯函数，它接收旧的state和action作为参数，
     * 并返回一个新的state。为了保证Redux的状态管理的不可变性，我们需要对state进行浅拷贝或深拷贝一份
     */
    state = _.clone(true, state)   //将state进行深克隆
    switch (action.type) {
        // case'VOTE_SUP':
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
