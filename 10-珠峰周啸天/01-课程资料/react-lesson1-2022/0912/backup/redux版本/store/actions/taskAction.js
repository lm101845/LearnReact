import { TASK_LIST, TASK_REMOVE, TASK_UPDATE } from '../action-types';
import api from '@/api';

const taskAction = {
    // redux-promise
    async getTaskList() {
        let result = {};
        try {
            result = await api.queryList();
            if (+result.code !== 0) result.list = [];
        } catch (_) {
            result.list = [];
        }
        return {
            type: TASK_LIST,
            payload: result.list
        };
    },
    // redux-thunk
    getTaskListThunk() {
        return async dispath => {
            try {
                let { code, list } = await api.queryList();
                if (+code !== 0) list = [];
                dispath({
                    type: TASK_LIST,
                    payload: list
                });
            } catch (_) {
                dispath({
                    type: TASK_LIST,
                    payload: []
                });
            }
        };
    },
    removeTask(id) {
        return {
            type: TASK_REMOVE,
            id
        };
    },
    completeTask(id) {
        return {
            type: TASK_UPDATE,
            id
        };
    }
};
export default taskAction;