import * as AT from '../action-types';
import API from '../../api';

const baseAction = {
    // 获取登录者信息「异步派发」
    async queryLoginProfile() {
        let profile = null;
        try {
            let { code, data } = await API.queryUserInfo();
            if (+code === 0) {
                // 已经登录
                profile = data;
            }
        } catch (_) { }
        return {
            type: AT.BASE_USER_INFO,
            profile
        };
    },
    // 清除登录者信息「同步派发」
    clearLoginProfile() {
        return {
            type: AT.BASE_USER_INFO,
            profile: null
        };
    },
    // 获取收藏列表「异步派发」
    async queryStoreList() {
        let storeList = [];
        try {
            let { code, data } = await API.queryStoreList();
            if (+code === 0) {
                storeList = data;
            }
        } catch (_) { }
        return {
            type: AT.BASE_STORE_LIST,
            storeList
        };
    },
    // 清除收藏列表「同步派发」
    clearStoreList() {
        return {
            type: AT.BASE_STORE_LIST,
            storeList: null
        };
    },
    // 移除收藏列表中的某一项「同步派发」
    removeStoreInfo(id) {
        return {
            type: AT.BASE_STORE_REMOVE,
            id
        };
    }
};
export default baseAction;