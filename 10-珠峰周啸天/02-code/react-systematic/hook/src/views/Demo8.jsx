import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import './Demo.less'

//模拟从服务器异步获取数据
const queryData = ()=>{
    return new Promise(resolve => {
        console.log('执行器函数是同步函数')
        setTimeout(()=>{
            resolve([10,20,30])
        },3000)
    })
}
const Demo = props => {
    let [num,setNum] = useState(0)
    //要求：num > 5的时候，才调用useEffect函数
    /**
     * useEffect必须在函数的最外层上下文中调用，不能把其嵌入到条件判断、循环等操作语句中
     * 报错：React Hook "useEffect" is called conditionally.
     * React Hooks must be called in the exact same order in every component render
     */
    //错误写法:
    // if(num>5){
    //     useEffect(()=>{
    //         console.log('打印')
    //     })
    // }

    //正确写法
    useEffect(()=>{
        if(num > 5){
            console.log('num大于5才触发')
        }
    },[num])

    //第一次渲染完毕后，从服务器异步获取数据
    //报错 useEffect must not return anything besides a function, which is used for clean-up
    //useEffect如果有返回值，比返回值必须是一个函数[代表组件在销毁时触发]
    //下面案例中，callback经过async的修饰，返回的是一个promise实例，不符合要求

    // useEffect(async ()=>{
    //     let data = await queryData()
    //     console.log('模拟componentDidMount,只有第一次渲染才执行,成功',data)
    // },[])

    //方法1：不用async,await了
    // useEffect(()=>{
    //     queryData().then(data=>{
    //         console.log(data,'不用async,await来拿到数据')
    //     })
    // },[])

    //方法2：在外面包一层
    useEffect(()=>{
        const next = async ()=>{
            let data = await queryData()
            console.log(data,'data111')
        }
        next()
    },[])
    const handle = () => {
        setNum(num + 1)
    }
    return <div className="demo">
        <span className="num">num:{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo

