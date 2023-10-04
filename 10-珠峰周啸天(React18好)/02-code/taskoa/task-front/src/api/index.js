/**
 * @Author liming
 * @Date 2023/7/17 13:35
 **/
import http from './http';

// 获取指定状态的任务列表
export const queryList = (state = 0) => {
    return http.get('/getTaskList', {
        params: {
            state
        }
    });
};

// 新增任务
// export const addTask = data => http.post('/addTask', data);
export const addTask = (task,time) => http.post('/addTask', {
    task,
    time
});


// 删除任务
export const removeTask = id => {
    return http.get('/removeTask', {
        params: {
            id
        }
    });
};

// 完成任务
export const completeTask = id => {
    return http.get('/completeTask', {
        params: {
            id
        }
    });
};

// export default {
//     queryList,
//     addTask,
//     removeTask,
//     completeTask
// };
