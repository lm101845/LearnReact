import React, {useEffect, useRef, useState,useImperativeHandle} from 'react'
import {Button} from 'antd'
import './Demo.less'

//通过ref获取子组件的实例，这样基于实例可以调用子组件内部挂载到实例上的东西
//类组件使用ref
class Child extends React.Component {
    state = {x: 1000}

    render() {
        return (
            <div>{this.state.x}</div>
        );
    }
}

//函数组件使用ref
//函数子组件内部，可以有自己的状态和方法了：如何实现：基于forwardRef转发实现ref的同时，获取函数组件内部的状态或方法呢
//———使用useImperativeHandle函数即可
const Child2 = React.forwardRef((props, ref) => {
    console.log(ref, '函数组件的ref')
    let [text, setText] = useState("你好，世界")
    const submit = () => {}
    useImperativeHandle(ref,()=>{
        //在这里返回的内容，都可以被父组件的ref对象获取到
        return {
            text,
            submit
        }
    })
    return <div className="child-box">
        <span>哈哈哈</span>
        {/*<span ref={ref}>哈哈哈</span>*/}
    </div>
})
const Demo = props => {
    let [num, setNum] = useState(0)
    let x = useRef(null)
    let x1 = useRef(null)

    useEffect(() => {
        console.log(x.current, '获取类子组件的实例')
        console.log(x1.current, '获取函数子组件的实例')
    }, [])

    return <div className="demo">
        <Child ref={x}/>
        {/*类组价可以直接设置ref*/}
        <Child2 ref={x1}/>
        {/*函数组件不能直接设置ref!!!要配合forwardRef才能用*/}


    </div>
}

export default Demo

