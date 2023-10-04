/**
 * @Author liming
 * @Date 2023/10/4 12:45
 **/

/**
 *  ref.current 不能作为其它 Hooks 的依赖项
 *
 *  由于 ref.current 值的变化不会造成组件的 rerender，而且 React 也不会跟踪 ref.current 的变化，
 *  因此 ref.current 不可以作为其它 hooks（useMemo、useCallback、useEffect 等） 的依赖项。
 */
import React, {useEffect, useRef, useState} from 'react'

const RefTimer: React.FC = () => {
    const [count, setCount] = useState(0)
    const time = useRef(Date.now())
    //ref(time)的变化，不会导致组件的重新渲染
    console.log(time,'当前的time')

    const updateTime = () => {
        time.current = Date.now()
        console.log(time.current,'现在的time.current')
    }

    console.log('组件被渲染了')

    //useEffect会在组件首次渲染完毕之后，默认执行一次
    //组件每次渲染完毕后触发userEffect中的回调函数
    //如果给了依赖性数组，则还要判断依赖性是否发生变化，再决定是否触发回调
    //time.current的变化不会导致useEffect的执行！！！
    useEffect(() => {
        console.log('time 的值发生了变化：' + time.current)
    }, [time.current])

    return (
        <>
            <h3>
                count值是：{count}, 时间戳是：{time.current}
            </h3>
            <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
            <button onClick={updateTime}>给ref赋新值11</button>
        </>
    )
}

export default RefTimer
