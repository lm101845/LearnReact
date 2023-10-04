/**
 * @Author liming
 * @Date 2023/9/1 21:52
 **/

import * as TYPES from '../action-type'
import _ from '@/assets/utils'
const initial = {
    taskList:null
}

export default function taskReducer(state=initial,action){
    state = _.clone(true,state)
    let {taskList} = state
    switch (action.type){
        case TYPES.TASK_LIST:
            state.taskList = action.list
            break
        case TYPES.TASK_UPDATE:
            if(Array.isArray(taskList)){
                state.taskList = taskList.map(item=>{
                    if(item.id === +action.id){
                        item.state = 2;
                        item.complete = new Date().toLocaleString('zh-CN',{hour12:false})
                    }
                    return item
                })
            }
            break
        case TYPES.TASK_REMOVE:
            if(Array.isArray(taskList)){
                state.taskList = taskList.filter(item=>{
                    return +item.id !== +action.id
                })
            }
            break
        default:
    }
    return state
}

//获取全部任务 dispatch({type:'TASK_LIST',list:[...]})
//删除任务 dispatch({type:'TASK_REMOVE',id:xxx})
//完成任务 dispatch({type:'TASK_UPDATE',id:xxx})
