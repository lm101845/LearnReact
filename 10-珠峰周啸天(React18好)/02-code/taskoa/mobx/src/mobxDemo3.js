/**
 * @Author liming
 * @Date 2023/9/3 17:12
 **/
import React from 'react'
import {observable,autorun} from "mobx";
import {observer} from 'mobx-react'


class Store{
    //observable把状态变为可监测的，只有这样，以后基于autorun/@observer等监测机制才会生效
    @observable x = 10;
}

let store = new Store

autorun(()=>{
    //首先会立即执行一次,自动建立依赖监测[监测用到的状态]
    //当依赖的值发生改变，callback会重新执行
    console.log('autorun函数执行了',store.x)
})

setTimeout(()=>{
    store.x = 1000
    console.log(store.x)
},1000)
