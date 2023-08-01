import React, {useState} from 'react'
import {Button} from 'antd'
import './Demo.less'

console.log(React, 'react')
/**
 * useState:React Hook函数之一，目的是在函数组件中使用状态，并且后期基于状态的修改，可以让组件更新
 * 返回结果是一个数组[]
 *
 */
const Demo = () => {
    let [num, setNum] = useState(0)
    // console.log(num, setNum)
    // console.log(this,'函数组件已经没有this这个概念了，打印出来是undefined')
    const handle = () => {
        setNum(num + 10)
    }
    return <div className="demo">
        <span className="num">{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
