import React, {useState} from 'react'
import {Button} from 'antd'
import './Demo.less'


/**
 * 函数组件的每次渲染(或者更新),都是函数的重新执行，每一次执行都会产生一个全新的[私有上下文]
 *  +内部的代码也需要重新执行
 * @returns {JSX.Element}
 * @constructor
 */
const Demo = () => {
    console.log('Demo函数执行了一次')
    let [num, setNum] = useState(0)
    const handle = () => {
        console.log('handle函数执行了一次')
        setNum(num + 10)
        setTimeout(()=>{
            console.log(num,'2秒后num状态值:0！！！变量按作用域链往上找！！跟新修改的状态无关')
        },2000)
    }
    return <div className="demo">
        <span className="num">{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
