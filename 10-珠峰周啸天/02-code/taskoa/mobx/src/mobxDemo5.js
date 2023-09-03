/**
 * @Author liming
 * @Date 2023/9/3 17:49
 **/
import React from 'react'
import {observable, autorun, observe,computed,reaction} from "mobx";
import {observer} from 'mobx-react'

class Store{
    @observable x = 10
    @observable count = 3
    @observable price = 120
    @computed get total(){
        console.log('total执行了')
        return this.count * this.price
    }
}

let store = new Store

//reaction和autorun一样，都是监听器，不过它提供更细粒化的状态监测[第一次默认不执行]
autorun(()=>{
    // console.log('autorun',store.x,store.count * store.price)
    console.log('autorun执行了',store.x,store.total)
    //注：total不是方法，是一个计算属性
})

reaction(()=>[store.x,store.total],()=>{
    console.log('reaction执行了',store.x,store.total)
})

setTimeout(()=>{
    // store.x = 1000   //total计算属性不会重新执行
    store.count = 10    //total计算属性会重新执行，计算出新的值
    //改x状态，但count和price依旧重新计算了
},1000)

