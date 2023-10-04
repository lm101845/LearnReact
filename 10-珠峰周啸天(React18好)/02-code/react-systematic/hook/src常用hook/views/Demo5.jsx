import React, {useState} from 'react'
import {Button} from 'antd'
import './Demo.less'
import {flushSync} from "react-dom";


const Demo = props => {
    console.log('Demo函数执行了一次,render渲染')
    //我们需要把基于属性传递进来的x,y，相加后(或其他复杂处理)的结果作为初始值

    // for (let i = 0; i <= y; i++) {
    //     total += +String( Math.random()).substring(2)
    // }
    // let [num, setNum] = useState(total)
    //初始值total只有第一次才有用,而求初始值是一个复杂的逻辑,我们可以把这个逻辑写在函数里面
    let [num, setNum] = useState(()=>{
        let {x,y} = props,total = 0
        for (let i = 0; i <= y; i++) {
            total += +String( Math.random()).substring(2)
        }
        return total
    })

    const handle = () => {
        setNum(1000)
    }
    return <div className="demo">
        <span className="num">num:{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
