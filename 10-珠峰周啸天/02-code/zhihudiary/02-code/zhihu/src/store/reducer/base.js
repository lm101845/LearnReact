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
    switch (action.type){
        default:
    }
    return state
}
