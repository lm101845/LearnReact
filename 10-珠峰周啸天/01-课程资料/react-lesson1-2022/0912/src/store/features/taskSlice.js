/*
 createSlice 创建每个版块的切片「集成了reducer/actionCreator」 
 */
import { createSlice } from '@reduxjs/toolkit';
import api from '@/api';

const taskSlice = createSlice({
    // 指定名字和初始状态
    name: 'task',
    initialState: {
        list: null
    },
    // 包含需要派发的行为及修改公共状态
    reducers: {
        getTaskList(state, { payload }) {
            // state：公共状态「内部基于immer库管理，无需自己克隆更改」
            // action：派发的对象，不论传递啥值，都是基于payload字段传递的
            state.list = payload;
        },
        removeTask(state, { payload }) {
            if (!Array.isArray(state.list)) return;
            state.list = state.list.filter(item => {
                return +item.id !== +payload;
            });
        },
        completeTask(state, { payload }) {
            if (!Array.isArray(state.list)) return;
            state.list = state.list.map(item => {
                if (+item.id === +payload) {
                    item.state = 2;
                    item.complete = new Date().toLocaleString('zh-CN', { hour12: false });
                }
                return item;
            });
        }
    }
});

// askSlice.actions：每一个函数就是一个actionCreator
export const { getTaskList, removeTask, completeTask } = taskSlice.actions;
// 基于redux-thunk中间件实现异步派发
export const getTaskListAsync = () => {
    return async dispatch => {
        try {
            let { code, list } = await api.queryList();
            if (+code !== 0) list = [];
            dispatch(getTaskList(list));
        } catch (_) {
            dispatch(getTaskList([]));
        }
    };
};
// taskSlice.reducer：获取的就是reducer函数，里面包含了对应行为标识的判断和状态的更改
export default taskSlice.reducer;