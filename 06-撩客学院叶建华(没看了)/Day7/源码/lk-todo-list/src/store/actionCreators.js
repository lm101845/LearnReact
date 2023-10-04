import {
    DEL_TODO_ITEM,
    CHANGE_TODO_ITEM,
    ADD_TODO_ITEM,
    REMOVE_FINISHED_TODO_ITEM,
    IS_CHECKED_ALL_TODO_ITEM,
    GET_ALL_ITEM
} from './actionTypes'
import {getTodoList} from "../api";
import store from "./index";

// 0. 获取所有记录
/*export const getAllItemAction = (todos) => ({
    type: GET_ALL_ITEM,
    todos
});*/

export const getAllItemAction = () =>{
     return (dispatch)=>{
         getTodoList().then((res)=>{
             if(res.success_code === 200){
                 const todos = res.items;
                 store.dispatch({
                     type: GET_ALL_ITEM,
                     todos
                 });
             }
         });
        /* console.log(result);
         if(result.success_code === 200){
             const action = getAllItemAction(result.items);
             store.dispatch(action);
         }*/
     }
};

// 1. 删除一条记录
export const getDelItemAction = (todoId) => ({
    type: DEL_TODO_ITEM,
    todoId
});

// 2. 修改一条记录的状态
export const getChangeItemFinishedAction = (todoId, isFinished) => ({
    type: CHANGE_TODO_ITEM,
    todoId,
    isFinished
});

// 3. 添加一条记录
export const getAddItemAction = (todo) => ({
    type: ADD_TODO_ITEM,
    todo
});

// 4. 删除已经完成的所有任务
export const getRemoveFinishedItemAction = () => ({
    type: REMOVE_FINISHED_TODO_ITEM
});

// 5. 全选和非全选
export const getIsCheckedAll = (flag) => ({
    type: IS_CHECKED_ALL_TODO_ITEM,
    flag
});
