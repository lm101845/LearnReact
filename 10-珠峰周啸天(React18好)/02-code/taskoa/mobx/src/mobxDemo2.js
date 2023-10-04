/**
 * @Author liming
 * @Date 2023/9/3 16:51
 **/
import React from 'react'
import {observable,action} from "mobx";
import {observer} from 'mobx-react'

//创建一个容器
class Store{
    //公共状态
    @observable num = 10
    //修改公共状态的方法
    @action change(){
        this.num++
        console.log(this.num)
    }
}

let store = new Store

// @observer
//报错：函数组件不允许使用装饰器，只有类才被允许使用装饰器
//但我们可以使用observer函数包起来
const Demo1 = observer(()=>{
    return <div>
        <span>{store.num}</span>
        <br/>
        <button onClick={()=>{store.change()}}>按钮</button>
    </div>
})

export default Demo1
