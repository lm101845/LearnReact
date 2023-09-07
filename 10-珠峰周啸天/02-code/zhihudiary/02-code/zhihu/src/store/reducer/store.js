/**
 * @Author liming
 * @Date 2023/9/7 9:46
 **/
import * as TYPES from '../action-types'
import _ from '../../assets/utils'
let initial = {
    list:null
    //收藏列表
}

export default function storeReducer(state=initial,action){
    state = _.clone(state)
    switch (action.type){
        default:
    }
    return state
}
