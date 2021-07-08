import {
    DEL_TODO_ITEM,
    CHANGE_TODO_ITEM,
    ADD_TODO_ITEM,
    REMOVE_FINISHED_TODO_ITEM,
    IS_CHECKED_ALL_TODO_ITEM,
    GET_ALL_ITEM
} from './actionTypes'

// 默认的数据
const defaultState = {
    todos: [],
    finishedCount: 0
};

export default (state = defaultState, action)=>{
    console.log(state, action);
    // 0. 获取所有的TODO
    if(action.type === GET_ALL_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.todos = action.todos;
        return newState;
    }
    // 1. 删除一条Todo
    if(action.type === DEL_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        // 1.1 遍历
        let finishedCount = 0;
        newState.todos.forEach((todo, index) => {
            if (todo.id === action.todoId) {
                newState.todos.splice(index, 1);
            }
        });
        // 1.2 处理选中的
        newState.todos.forEach((todo, index) => {
            if (todo.finished) {
                finishedCount += 1;
            }
        });
        // 1.3 更新状态
        newState.finishedCount = finishedCount;
        return newState;
    }
    // 2. 修改一条记录的状态
    if(action.type === CHANGE_TODO_ITEM){
        // 1.1 遍历
        const newState = JSON.parse(JSON.stringify(state));
        let finishedCount = 0;
        newState.todos.forEach((todo, index) => {
            if (todo.id === action.todoId) {
                todo.finished = action.isFinished;
            }
            if (todo.finished) {
                finishedCount += 1;
            }
        });

        // 2.3 返回新的数据状态
        newState.finishedCount = finishedCount;
        return newState;
    }
    // 3. 添加一条记录
    if(action.type === ADD_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        newState.todos.push(action.todo);
        return newState;
    }
    // 4. 删除已经完成的所有任务
    if(action.type === REMOVE_FINISHED_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        // 4.1 取出对象
        let tempArr = [];
        newState.todos.forEach((todo, index) => {
            if (!todo.finished) {
                tempArr.push(todo);
            }
        });
        // 4.2 返回最新的状态
        newState.todos = tempArr;
        newState.finishedCount = 0;
        return newState;
    }
    // 5. 全选和非全选
    if(action.type === IS_CHECKED_ALL_TODO_ITEM){
        const newState = JSON.parse(JSON.stringify(state));
        // 5.1 遍历
        let finishedCount = 0;
        newState.todos.forEach((todo, index) => {
            todo.finished = action.flag;
        });

        // 5.2 处理选中的
        newState.todos.forEach((todo, index) => {
            if (todo.finished) {
                finishedCount += 1;
            }
        });

        // 5.3 更新状态
        newState.finishedCount = finishedCount;
        return newState;
    }
    return state;
}