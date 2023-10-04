import React, {useState} from 'react'
import {Button} from 'antd'
import './Demo.less'
import {flushSync} from "react-dom";



const Demo = () => {
    console.log('Demo函数执行了一次,render渲染')
    let [x, setX] = useState(10)
    let [y, setY] = useState(20)
    let [z, setZ] = useState(30)
    const handle = () => {
        //点击新增的时候，x,y,z每个都+1
        //异步操作！！！！原理等同于类组件中的this.setState(基于异步操作和更新队列，实现状态的批处理)
        //在任何地方修改状态，都是采用异步编程
        // setX(x+1)
        // console.log(x,'x')   //不管同步异步，都显示上次内容，无法测出同步异步
        // setY(y+1)
        // setZ(z+1)

        //等1秒钟，它也只渲染一次，异步的
        // setTimeout(()=>{
        //     setX(x+1)
        //     setY(y+1)
        //     setZ(z+1)
        // },1000)

        //想要把它变成同步的，使用flushSync方法即可
        flushSync(()=>{
            setX(x+1)
            setY(y+1)
        })
        setZ(z+1)
    }
    return <div className="demo">
        <span className="num">x:{x}</span>
        <span className="num">y:{y}</span>
        <span className="num">z:{z}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
