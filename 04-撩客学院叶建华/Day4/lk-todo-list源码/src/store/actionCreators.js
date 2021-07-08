import {DEL_TODO_ITEM, CHANGE_TODO_ITEM, ADD_TODO_ITEM, REMOVE_FINISHED_TODO_ITEM, IS_CHECKED_ALL_TODO_ITEM} from './actionTypes'

// 1. 删除一条记录
export const getDelItemAction = (todoId)=>({
    type: DEL_TODO_ITEM,
    todoId
});

// 2. 修改一条记录的状态
export const getChangeItemFinishedAction = (todoId, isFinished)=>({
    type: CHANGE_TODO_ITEM,
    todoId,
    isFinished
});

// 3. 添加一条记录
export const getAddItemAction = (todo)=>({
    type: ADD_TODO_ITEM,
    todo
});

// 4. 删除已经完成的所有任务
export const getRemoveFinishedItemAction = ()=>({
    type: REMOVE_FINISHED_TODO_ITEM
});

// 5. 全选和非全选
export const getIsCheckedAll = (flag) => ({
   type: IS_CHECKED_ALL_TODO_ITEM,
   flag
});
