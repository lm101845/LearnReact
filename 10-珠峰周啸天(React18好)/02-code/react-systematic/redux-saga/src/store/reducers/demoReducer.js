/**
 * @Author liming
 * @Date 2023/9/12 0:08
 **/

import _ from '@/assets/utils'
import * as TYPES from '../action-types'
const initial = {
    num:10
}
const demoReducer = (state = initial, action) => {
    state = _.clone(true, state)
    let {payload = 1} = action   //payload:记录每一次累加的数字
    switch (action.type) {
        case TYPES.DEMO_COUNT:
            state.num += payload
            break;
        default:
    }
    return state
}

export default demoReducer
