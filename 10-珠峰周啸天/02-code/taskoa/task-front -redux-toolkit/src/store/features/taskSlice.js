/**
 * @Author liming
 * @Date 2023/9/2 17:15
 **/
//TASK板块的切片,包含REDUCER & ACTION-CREATOR
import {createSlice} from '@reduxjs/toolkit'
import {queryList} from '../../api'
const taskSlice = createSlice({
    name:'task',
    //设置此切片对应reducer中的初始状态
    initialState:{
        taskList:null
    },
    //编写不同业务逻辑下，对公共状态的更改(之前的switch判断)
    reducers:{
        getAllTaskList(state,action){
            //这个state也不需要对它进行克隆了,操作它不会对原来状态产生影响
            //state:redux中的公共状态信息[基于immer库管理,无需自己再克隆了]
            //action:派发的行为对象，我们无需考虑行为标识问题了,传递的其他信息，都是以action.payload传递
            state.taskList = action.payload
        },
        removeTask(state,{payload}){
            let taskList = state.taskList
            if(!Array.isArray(taskList)) return  //不是数组就不用管它了
            state.taskList = taskList.filter(item=>{
                //payload:接收传递进来的，要删除哪一项的id
                return +item.id !== +payload
            })
        },
        updateTask(state,{payload}){
            let taskList = state.taskList
            if(!Array.isArray(taskList)) return
            state.taskList = taskList.map(item=>{
                if(+item.id === +payload){
                    item.state = 2
                    item.complete = new Date().toLocaleString('zh-CN')
                }
                return item
            })
        }
    }
})

console.log(taskSlice,'打印taskSlice')
//从切片中获取actionCreator:此处解构的方法和上面reducers中的方法，仅仅是函数名相同
//方法执行，返回需要派发的行为对象，后期我们可以基于dispatch进行任务派发即可！！
export let {getAllTaskList,removeTask,updateTask}= taskSlice.actions
console.log(getAllTaskList([1,2,3]),'函数执行结果')   //{type: 'task/getAllTaskList', payload: Array(3)}

//实现异步派发[redux-thunk]
export const getAllTaskListAsync = ()=>{
    //异步派发要派发2次
    /**
     * 在React-Redux中，异步派发需要派发两次的原因是为了确保数据的一致性和完整性。
     * 第一次派发主要用于标记或启动异步操作，例如从服务器获取数据。
     * 第二次派发则是在异步操作完成之后，用于将数据更新到Redux Store中。
     *
     * 通过派发两次，Redux确保了在数据更新之前异步操作已经完成。
     * 这样，视图层可以及时地获取最新的数据并更新，从而保持数据的一致性。
     * */
    //第一次
    return async dispatch=>{
        let list = []
        try{
            let result = await queryList(0)
            if(+result.code === 0){
                list = result.list
            }
        }catch (_){}
        //第二次
        dispatch(getAllTaskList(list))   //手动完成一次派发
    }
}
//从切片中获取reducer
export default taskSlice.reducer
//我们只用导出切片下的reducer即可
