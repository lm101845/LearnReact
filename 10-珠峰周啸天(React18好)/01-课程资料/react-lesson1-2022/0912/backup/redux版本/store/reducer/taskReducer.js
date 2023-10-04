import { TASK_LIST, TASK_REMOVE, TASK_UPDATE } from '../action-types';
import _ from '@/assets/utils';

let initial = {
    list: null
};
export default function taskReducer(state = initial, action) {
    state = _.clone(true, state);
    let { type, payload, id } = action;

    // 同步全部任务
    if (type === TASK_LIST) {
        state.list = payload;
    }

    if (Array.isArray(state.list)) {
        // 删除指定任务
        if (type === TASK_REMOVE) {
            state.list = state.list.filter(item => {
                return +item.id !== +id;
            });
        }

        // 修改指定任务
        if (type === TASK_UPDATE) {
            state.list = state.list.map(item => {
                if (+item.id === +id) {
                    item.state = 2;
                    item.complete = new Date().toLocaleString('zh-CN', { hour12: false });
                }
                return item;
            });
        }
    }

    return state;
};