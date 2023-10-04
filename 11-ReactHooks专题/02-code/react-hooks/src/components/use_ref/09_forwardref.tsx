/**
 * @Author liming
 * @Date 2023/10/4 12:57
 **/

import React, {useImperativeHandle, useRef, useState} from 'react'

const Child: React.FC = React.forwardRef((_, ref) => {
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)

    //useImperativeHandle的第三个参数
    useImperativeHandle(ref, () => {
        console.log('执行了useImperativeHandle中的回调函数')
        return {
            count,
            //不直接把setCount函数暴露出去，这样太危险了，我们封装一个自定义方法，暴露出去比较好
            reset: () => {

                setCount(0)
            }
        }
    // }, [])
        // 这个 console 只执行1次，哪怕 count 值更新了，也不会重新执行
        // 导致的结果是：外界拿到的 count 值，永远是组件首次渲染时的初始值 0
    }, [count])
    // // 注意：只有 count 值变化，才会触发回调函数的重新执行
    //    // flag 值的变化，不会导致回调函数的重新执行，因为 flag 没有被声明为依赖项

    const add = (step: number) => {
        setCount((prev) => (prev += step))
    }

    return (
        <>
            <h3>Child 子组件 {count}</h3>
            <p>flag 的值是：{String(flag)}</p>
            <button onClick={() => add(-1)}>-1</button>
            <button onClick={() => add(1)}>+1</button>
            {/* 点击按钮，切换布尔值 */}
            <button onClick={() => setFlag((boo) => !boo)}>Toggle</button>
        </>
    )
})

// 父组件
const Father: React.FC = () => {
    const childRef = useRef<{ count: number; reset: () => void }>()

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
            <hr/>
            {/*下面这行代码中的 ref 使用不正确，因为 Child 组件是函数式组件，无法被直接引用*/}
            <Child ref={childRef}/>
        </>
    )
}

export default Father
