import * as AT from '../action-types';
import _ from '../../assets/utils';

let initial = {
    profile: null,
    storeList: null
};
export default function baseReducer(state = initial, action) {
    state = _.clone(true, state);
    switch (action.type) {
        case AT.BASE_USER_INFO:
            // 获取登录者信息
            state.profile = action.profile;
            break;
        case AT.BASE_STORE_LIST:
            // 获取收藏列表
            state.storeList = action.storeList;
            break;
        case AT.BASE_STORE_REMOVE:
            // 移除收藏列表中的某一项
            if (Array.isArray(state.storeList)) {
                state.storeList = state.storeList.filter(item => {
                    return +item.id !== +action.id;
                });
            }
            break;
        default:
    }
    return state;
};