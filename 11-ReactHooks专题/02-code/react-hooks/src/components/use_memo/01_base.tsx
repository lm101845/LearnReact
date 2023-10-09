/**
 * @Author liming
 * @Date 2023/10/9 17:00
 **/

import React, { useEffect, useState, useMemo } from 'react'

// 父组件
export const Father: React.FC = () => {
    // 定义 count 和 flag 两个状态
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)

    // 根据布尔值进行计算，动态返回内容
    // 注意：useMemo 的返回值是一个计算好的值，而不是函数了
    //tips值有缓存，只有flag变化，才会重新计算,可以提高性能
    const tips = useMemo(() => {
        console.log('触发了 tips 的重新计算')
        return flag ? <p>哪里贵了，不要睁着眼瞎说好不好</p> : <p>这些年有没有努力工作，工资涨没涨</p>
    }, [flag])
    return (
        <>
            <h1>父组件</h1>
            <p>count 的值是：{count}</p>
            <p>flag 的值是：{String(flag)}</p>
            {tips}
            <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
            <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
            <hr />
             <Son num={count} />
        </>
    )
}

// 子组件：依赖于父组件通过 props 传递进来的 num
// 被 React.memo() 包裹的子组件，只有 props 变化了，才会被重新渲染——类似计算属性
export const Son: React.FC<{ num: number }> = React.memo(({ num }) => {
    useEffect(() => {
        console.log('触发了子组件的渲染')
    })
    return (
        <>
            <h3>子组件 {num}</h3>
        </>
    )
})

