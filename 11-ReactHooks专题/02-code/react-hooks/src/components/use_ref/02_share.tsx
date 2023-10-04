/**
 * @Author liming
 * @Date 2023/10/4 9:50
 **/

import React, {useState} from 'react'

let prevCount:number
//把变量放到外面是可以实现的
//但这种方法不好，因为这个变量只在组件内部用到，所以还是放在内部好
const Count: React.FC = () => {
    const [count, setCount] = useState(0)
    // useRef() 只在组件首次渲染的时候被创建
    // 如果组件是 rerender 的时候，不会重复创建 ref 对象

    // let prevCount;
    const add = () => {
        setCount((prev) => prev + 1)
        //方法1：不行，因为只要状态改变，里面的函数都会重新执行，重新创建prevCount变量，所以每次都是undefined
        //我们可以把prevCount变量提取出去
        prevCount = count
        // prevCountRef.current = count
    }

    return <>
        <h1>
            新值是：{count}；旧值是：{prevCount}
            {/*新值是：{count}；旧值是：{prevCountRef.current}*/}
        </h1>
        <button onClick={add}>+1</button>
    </>
}

export default Count
