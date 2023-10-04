/**
 * @Author liming
 * @Date 2023/8/3 18:18
 **/

//Personal板块下的reducer
import _ from '@/assets/utils'
import * as TYPES from '../action-types'
const initial = {
    num: 100,
    info: null
}
const PersonalReducer = (state = initial, action) => {
    state = _.clone(true, state)   //将state进行深克隆
    switch (action.type) {
        // case 'PERSONAL_INFO':
        case TYPES.PERSONAL_INFO:
            state.info = action.payload;
            break
        default:
    }
    return state
}

// dispatch({
//     type:'PERSONAL_INFO',
//     payload:{name:'张三'}
// })

export default PersonalReducer


