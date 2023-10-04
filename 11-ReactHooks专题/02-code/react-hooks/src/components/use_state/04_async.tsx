/**
 * @Author liming
 * @Date 2023/10/2 7:42
 **/

import React, {useState,useEffect} from 'react'


//打印错误
// const Count: React.FC = () => {
//     const [count, setCount] = useState(() => 0)
//
//     const add = () => {
//         console.log('add函数执行了')
//         // 1. 让数值自增+1
//         setCount(count + 1)
//         // 2. 打印 count 的值
//         console.log(count,'打印的count还是之前的值，因为setState是异步的')
//     }
//
//     return (
//         <>
//             <h1>当前的 count 值为：{count}</h1>
//             <button onClick={add}>自增</button>
//         </>
//     )
// }


//打印正确
const Count: React.FC = () => {
    const [count, setCount] = useState(() => 0)

    const add = () => {
        setCount(count + 1)
    }

    // 当 count 变化后，会触发 useEffect 指定的回调函数
    useEffect(() => {
        console.log(count,'这里打印的就是最新的count了')
    }, [count])

    return (
        <>
            <h1>最新的 count 值为：{count}</h1>
            <button onClick={add}>自增</button>
        </>
    )
}

export default Count
