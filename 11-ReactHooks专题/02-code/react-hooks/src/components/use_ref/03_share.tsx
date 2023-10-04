/**
 * @Author liming
 * @Date 2023/10/4 9:50
 **/

import React, {useRef, useState} from 'react'


const Count: React.FC = () => {
    const [count, setCount] = useState(0)
    const prevCountRef = useRef<number>();
    // useRef() 只在组件首次渲染的时候被创建
    // 如果组件是 rerender 的时候，不会重复创建 ref 对象
    // 所以使用useRef可以存储组件渲染周期之间的共享数据

    // let prevCount;
    const add = () => {
        setCount((prev) => prev + 1)
        prevCountRef.current = count;
    }

    return <>
        <h1>
            新方法：新值是：{count}；旧值是：{prevCountRef.current}
        </h1>
        <button onClick={add}>+1</button>
    </>
}

export default Count
