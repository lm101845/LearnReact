import React, {useState} from 'react'
import {Button} from 'antd'
import './Demo.less'
import {flushSync} from "react-dom";


const Demo = () => {
    console.log('Demo函数执行了一次,render渲染')
    let [x, setX] = useState(10)
    const handle = () => {
        //也只渲染一次，最终结果是11
        // for (let i = 0; i < 10; i++) {
        //     // setX(x+1)
        //     flushSync(()=>{
        //         setX(x+1)
        //     })
        //     //setX(10)   //发现新修改的状态值和之前状态值一样，就不会更新了(自带性能优化机制)
        // }

        //需求：让函数只更新一次，但是最后的结果是20
        //类似于类组件里面的setState里面写的函数形式
        for (let i = 0; i < 10; i++) {
            setX(prev=>{
                console.log(prev,'prev')
                return prev + 1
            })
        }
    }
    return <div className="demo">
        <span className="num">x:{x}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
