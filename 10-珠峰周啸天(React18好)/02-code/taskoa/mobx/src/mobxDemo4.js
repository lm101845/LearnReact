/**
 * @Author liming
 * @Date 2023/9/3 17:49
 **/
import React from 'react'
import {observable, autorun, observe} from "mobx";
import {observer} from 'mobx-react'
//讲过observable处理后的数据，是基于proxy做过数据劫持的，这样我们后期修改状态值，就可以在setter函数中去做
//一些特殊处理，例如：把依赖其值的监听器触发执行
let obj = observable({
    x: 10,
    y: 20
})
console.log(obj, 'obj')

let obj1 = {
    x: 10,
    y: 20
}

let proxyObj1 = new Proxy(obj, {
    get(target, key) {
        console.log('GETTER')
        return target[key]
    },
    set(target, key, val) {
        console.log('SETTER')
        target[key] = val
        // return true
        return key
    }
})

console.log(proxyObj1, 'proxyObj1')   //返回的代理对象是被劫持的
console.log(proxyObj1.x)   //获取某个成员值的时候，就会触发get函数
proxyObj1.x = 1000
console.log(proxyObj1.x)   //获取某个成员值的时候，就会触发get函数

console.log('====================')
//observe创建监听器，对对象进行监听，当对象中的某个成员发生改变，触发回调函数执行
//前提：对象基于observable修饰

let obj2 = observable({
    x: 100,
    y: 200
})
observe(obj2, change => {
    console.log(change, 'change函数执行了')
    //{type: 'update', object: Proxy(Object), oldValue: 100, name: 'x', newValue: 1000}
})


obj2.x = 1000

console.log('=======================')
//observable无法直接监测原始值，需要使用observable.box处理
let y = observable.box(123)
console.log(y,'监听y')

console.log(y.get())



