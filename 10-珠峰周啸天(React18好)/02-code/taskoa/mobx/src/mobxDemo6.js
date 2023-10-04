/**
 * @Author liming
 * @Date 2023/9/3 18:33
 **/
import React from 'react'
import {observable, autorun, action,configure,runInAction} from "mobx";
import {observer} from 'mobx-react'

//mobx的全局配置
configure({
    //强制使用action方法的模式，去修改状态；不允许单独基于实例进行修改了
    enforceActions:'observed'
})


//模拟从服务器异步获取数据
const query = ()=>{
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(8848)
        },1000)
    })
}

class Store{
    @observable x = 10
    @observable y = 20
    //action：修饰函数的装饰器，它让函数中的状态更改变为[异步批处理]
    //真实项目建议都使用这种方式,不要在外面基于实例直接修改了
    // @action change(){
    //bound:保证this都是实例
    // @action.bound change(){
    //     this.x = 1000
    //     this.y = 2000
    // }

    @action.bound async change(){
        let res = 0
        try{
            res = await query()
        }catch (_){}
        // this.x = res

        runInAction(()=>{
            this.x = res
        })
    }
}

let store = new Store

autorun(()=>{
    console.log('autorun执行了',store.x,store.y)
})


// setTimeout(()=>{
//     //修改多个状态，会让autorun监听器执行多次(我们想让它批处理！！)
//     // store.x = 1000
//     // store.y = 2000
//
//     // store.change()   //this->store
//     // let func = store.change
//     // func()   //this->undefined(不好，我们就在上面使用bound)
//
//     runInAction(()=>{
//         //这样写，也只会触发一次
//         store.x = 1000
//         store.y = 2000
//     })
// },1000)

store.change()   //返回promise实例
