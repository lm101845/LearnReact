/**
 * @Author liming
 * @Date 2023/9/7 9:41
 **/
//要想更新 state 中的数据，你需要发起一个 action
//State是只读的,唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。
//Action 就是普通对象而已

import * as TYPES from '../action-types'
import API from '../../api'
const baseAction = {
    //异步从服务器获取登录信息,完成派发
    async queryUserInfoAsync(){
        // console.log('queryUserInfoAsync函数执行了')
        let info = null
        try{
            let {code,data} = await API.queryUserInfo()
            // console.log(code,data,'queryUserInfoAsync函数结果data')
            if(+code === 0){
                info = data
            }
        }catch (_){}
        //返回一个派发标识
        return{
            type:TYPES.BASE_INFO,
            info
        }
    },

    //清除存储的登录信息
    clearUserInfo(){
        return{
            type:TYPES.BASE_INFO,
            info:null
        }
    }
}

export default baseAction
