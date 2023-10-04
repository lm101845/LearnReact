/**
 * @Author liming
 * @Date 2023/9/3 21:12
 **/
//task板块的store
import {observable, action, runInAction} from 'mobx'
import {queryList} from '../api'

export default class TaskStore{
    constructor(root) {
        //root:最外层store类的实例[包含各个版块store的实例]
        //我们以后可以在TASK板块中，基于this.root获取根Store实例,基于根Store实例，访问其他版块Store的实例
        this.root = root
    }
    @observable taskList = null

    //异步获取全部任务
    @action.bound async queryAllTaskAction(){
        let list = []
        try{
            let result = await queryList(0)
            if(+result.code === 0){
                list = result.list
            }
        }catch(_){}
        runInAction(()=>{
            this.taskList = list
        })
    }
    //同步删除某一任务
    @action.bound removeTaskAction(id){
        let {taskList} = this
        if(!Array.isArray(taskList)) return
        this.taskList = taskList.filter(item=>{
            return +item.id !== +id
        })
    }

    //同步修改某一任务
    @action.bound updateTaskAction(id){
        let {taskList} = this
        if(!Array.isArray(taskList)) return
        this.taskList = taskList.map(item=>{
            if(+item.id === +id){
                item.state = 2
                item.complete = new Date().toLocaleString('zh-CN')
            }
            return item
        })
    }
}
