import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import './Demo.less'

/**
 * useEffect:在函数组件中，使用生命周期函数
 * useEffect(callback)：没设置依赖
 *    +第一次渲染完毕后，执行callback,等价于componentDidMount
 *    +在组件每一个更新完毕后，也会执行callback,等价于componentDidUpdate
 *  useEffect(callback,[])：设置了，但是无依赖
 *    +只有在第一次渲染完毕后，才会执行callback(每一次视图更新完毕后，callback就不在执行了)
 *    +类似于componentDidMount
 *
 *  useEffect(callback,[依赖的状态(多个状态用逗号分隔)])：设置了，且有依赖
 *    +第一次渲染完毕会执行callback
 *    +当依赖的状态值(多个依赖状态中的一个)发生改变，也会触发callback执行
 *    +但是依赖的状态如果没有变化，在组件更新的时候，callback是不会执行的
 *
 *  useEffect(()=>{
 *      return ()=>{
 *        //返回的小函数，会在组件释放的时候执行
 *        //如果组件更新，会把上一次返回的小函数执行[可以'理解为'上一次渲染的组件释放了]
 *  })
 */
const Demo = props => {
    let [num,setNum] = useState(0)
    let [x,setX] = useState(100)
    //写法1：
    useEffect(()=>{
        // console.log('useEffect函数执行了')
        //获取最新的状态值
        console.log('@1-num',num)
        // console.log(document.querySelector('.num'))   //可以拿到
    })

    //写法2：添加第2个参数(只在第一次渲染完毕后才执行)
    useEffect(()=>{
        console.log('@2-num',num)
    },[])

    useEffect(()=>{
        console.log('@3-x只第一次执行',x)
        console.log('@3-num只第一次会执行',num)
    },[x])

    useEffect(()=>{
        return ()=>{
            console.log('@4,效果相当于componentWillOnMount')
        }
    })

    useEffect(()=>{
        return ()=>{
            //获取的是上一次的状态值
            console.log('@5',num)
        }
    },[num])
    const handle = () => {
        setNum(num + 1)
    }
    return <div className="demo">
        <span className="num">num:{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
