/**
 * @Author liming
 * @Date 2023/9/2 14:57
 **/
import qs from 'qs'
import {message} from 'antd'
import http from './api/http2'

http.get('/api/getTaskList',{
    params:{
       state:0
    }
}).then(value=>{
    console.log(value,'成功的结果')
})


//哈哈，这个删除也是用的get！！！
http.get('/api/removeTask',{
    params:{
        id:14
    }
}).then(value=>{
    console.log(value,'成功的结果--删除')
})
