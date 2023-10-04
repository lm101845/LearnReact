/**
 * @Author liming
 * @Date 2023/10/4 12:57
 **/

import React, {useImperativeHandle, useRef, useState} from 'react'


// 子组件（实现点击按钮，数值加减的操作）
// 使用 React.forwardRef包一下就能拿到子组件了
const Child: React.FC = React.forwardRef((_,ref) => {
    const [count, setCount] = useState(0)

    // 1. 向外暴露一个空对象
    // 2. useImperativeHandle(ref, () => ({}))
    // 向外暴露一个对象，其中包含了 name 和 age 两个属性
    useImperativeHandle(ref, () => ({
        name: 'liulongbin',
        age: 22
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
    const childRef = useRef()

    // 按钮的点击事件处理函数
    const onShowRef = () => {
        console.log(childRef.current)   //undefined
    }

    return (
        <>
            <h1>Father 父组件</h1>
            {/* 点击按钮，打印 ref 的值 */}
            <button onClick={onShowRef}>show Ref</button>
            <hr />
            {/*下面这行代码中的 ref 使用不正确，因为 Child 组件是函数式组件，无法被直接引用*/}
            <Child ref={childRef} />
        </>
    )
}

export default Father
