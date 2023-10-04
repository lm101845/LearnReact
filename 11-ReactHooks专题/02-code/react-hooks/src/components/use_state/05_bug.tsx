/**
 * @Author liming
 * @Date 2023/10/2 8:15
 **/

import React, {useState} from 'react'


const Count: React.FC = () => {
    const [count, setCount] = useState(() => 0)

    //错误写法：无法+1，+1
    // const add = () => {
    //     /**
    //      * setCount函数内部是异步的，但是调用setCount函数是同步的
    //      *
    //      * 因为 `setCount` 是异步地更新状态值的，
    //      * 所以前后两次调用 `setCount` 传递进去的新值都是 1。React 内部如果遇到两次相同的状态，则会默认阻止组件再次更新。
    //      */
    //     // 1. 希望让 count 值从 0 自增到 1
    //     setCount(count + 1)
    //     // 2. 希望让 count 值从 1 自增到 2
    //     setCount(count + 1)
    //     //在执行第2个setCount函数的时候，第一个状态并没有被修改完成，还是0
    // }

    //正确写法:setCount参数写成函数形式
    /**强调：当我们修改state状态的时候，如果我们发现：新值依赖于旧值(基于旧值进行计算，最终得到新值)
     * 此时，不要直接在外部进行计算，而是要通过fn函数的形参拿到旧值并进行计算，最终return新值
     *
     */

    const add = ()=>{
        setCount(prev=>prev+1);
        setCount(prev=>prev+1);
    }

    return (
        <>
            <h1>当前的 count 值为：{count}</h1>
            <button onClick={add}>自增</button>
        </>
    )
}

export default Count
