import http from './http';

// 获取指定状态的任务列表
const queryList = (state = 0) => {
    return http.get('/getTaskList', {
        params: {
            state
        }
    });
};

// 新增任务
const addTask = data => http.post('/addTask', data);

// 删除任务
const removeTask = id => {
    return http.get('/removeTask', {
        params: {
            id
        }
    });
};

// 完成任务
const completeTask = id => {
    return http.get('/completeTask', {
        params: {
            id
        }
    });
};

export default {
    queryList,
    addTask,
    removeTask,
    completeTask
};