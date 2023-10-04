/**
 * @Author liming
 * @Date 2023/10/2 6:50
 **/

import React, {FC,useState} from 'react'

/**
 * 每次只要状态发生变化，必然导致函数的重新执行
 * 函数组件每一次渲染/更新，都具备独立的闭包
 * @constructor
 */
const Count: FC = () => {
    console.log('Count函数执行了-触发了Count组件的渲染')
    const [count,setCount] = useState(0);
    /**
     * 这行代码是在 React 组件的初始渲染以及每次组件更新时都会执行的。
     * useState 是 React 的一个 Hook，用于在函数组件中添加局部状态。
     * useState 返回一个数组，其中第一个元素是当前状态值，第二个元素是一个函数，用来更新该状态值。
     *
     * 在你给出的代码 const [count, setCount] = useState(0); 中，0 是状态的初始值。
     * 这个代码不仅在组件首次渲染时会执行，而且在每次组件更新时也会执行。每次执行时，都会返回最新的状态值和更新函数。
     *
     * 然而，只有在组件首次渲染时，useState 会使用传递的初始值（在这个例子中是 0）。
     * 在后续的渲染中，useState 会返回最新的状态值，而不会再次使用初始值。
     * 所以，即使在组件更新时，这行代码也会执行，但它不会再次使用初始值 0。
     * 相反，它会返回最新的 count 值和相应的 setCount 函数。
     */

    const add = ()=>{
        setCount(count + 1)
    }
    return <>
        <h2>Count函数组件</h2>
        <h1>count 的值是：{count}</h1>
        <button onClick={add}>自增</button>
    </>
}

export default Count
