import { configureStore } from '@reduxjs/toolkit';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import taskReducer from './features/taskSlice';

/* 创建STORE容器 */
const store = configureStore({
    // 指定REDUCER，类似于combineReducers，需要执行版块名字「公共状态也是按照这个名字进行划分」
    reducer: {
        task: taskReducer
    },
    // 使用中间件：默认集成了redux-thunk
    middleware: [reduxThunk, reduxLogger]
});
export default store;