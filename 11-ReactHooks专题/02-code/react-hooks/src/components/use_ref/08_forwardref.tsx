/**
 * @Author liming
 * @Date 2023/10/4 12:57
 **/

import React, {useImperativeHandle, useRef, useState} from 'react'

const Child: React.FC = React.forwardRef((_,ref) => {
    const [count, setCount] = useState(0)

    useImperativeHandle(ref, () => ({
        count,
        //不直接把setCount函数暴露出去，这样太危险了，我们封装一个自定义方法，暴露出去比较好
        reset:()=>{
            console.log('暴露出去一个自定义方法')
            setCount(0)
        }
    }))

    const add = (step: number) => {
        setCount((prev) => (prev += step))
    }

    return (
        <>
            <h3>Child 子组件 {count}</h3>
            <button onClick={() => add(-1)}>-1</button>
            <button onClick={() => add(1)}>+1</button>
        </>
    )
})

// 父组件
const Father: React.FC = () => {
    const childRef = useRef<{count:number;reset:()=>void}>()

    // 按钮的点击事件处理函数
    const onShowRef = () => {
        console.log(childRef.current)   //undefined
    }

    // 重置按钮的点击事件处理函数
    const onReset = () => {
        childRef.current?.reset()
    }
    return (
        <>
            <h1>Father 父组件</h1>
            {/* 点击按钮，打印 ref 的值 */}
            <button onClick={onShowRef}>show Ref</button>
            {/* 点击按钮，重置数据为 0 */}
            <button onClick={onReset}>重置</button>
            <hr />
            {/*下面这行代码中的 ref 使用不正确，因为 Child 组件是函数式组件，无法被直接引用*/}
            <Child ref={childRef} />
        </>
    )
}

export default Father
