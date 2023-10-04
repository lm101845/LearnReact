/**
 * @Author liming
 * @Date 2023/10/2 8:45
 **/

import React, {useState} from 'react'

/**
 * 在函数组件中，我们可以通过 useState 来模拟 forceUpdate 的强制刷新操作。
 * 因为只要 useState 的状态发生了变化，就会触发函数组件的重新渲染，从而达到强制刷新的目的。
 */
 const FUpdate: React.FC = () => {
    const [_, forceUpdate] = useState({})

    // 每次调用 onRefresh 函数，都会给 forceUpdate 传递一个【新对象】
    // 从而触发组件的重新渲染
    const onRefresh = () => forceUpdate({})

    return (
        <>
            <button onClick={onRefresh}>点击强制刷新 --- {Date.now()}</button>
        </>
    )
}

export default FUpdate
