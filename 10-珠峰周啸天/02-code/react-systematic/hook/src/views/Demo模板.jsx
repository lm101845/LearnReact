import React, {useState} from 'react'
import {Button} from 'antd'
import './Demo.less'


const Demo = props => {
    let [num,setNum] = useState(0)
    const handle = () => {
        setNum(num + 1)
    }
    return <div className="demo">
        <span className="num">num:{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo

