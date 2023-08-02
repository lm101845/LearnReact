import React, {useContext, useEffect, useState} from 'react'
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from '../ThemeContext'

const Vote = () => {
    // const context = useContext(ThemeContext)
    // console.log(context,'上下文信息')
    const {store} = useContext(ThemeContext)
    console.log(store, 'Vote上下文中的store')
    //获取容器中的公共状态
    let {supNum, oppNum} = store.getState()
    //组件第一次渲染完毕后，把让组件更新的方法，放在store的事件池中

    /**
     * 这个update里面重写的setNum方法是为了组件更新而写的，不太优雅
     * 因为setNum里面写的代码和需求没有关系
     */

    //写法1：
    // let [num, setNum] = useState(0)
    //
    // const update = () => {
    //     setNum(num + 10000)   //随便写
    // }
    //
    // //等价于componentDidMount
    // useEffect(() => {
    //     let unsubscribable = store.subscribe(update)
    //     //return相当于临死前座的事情
    //     //在上一次组件释放的时候，把上一次放在事件池中的方法移除掉
    //     //好处：可以时刻保持update的上级上下文是最新的状态
    //     return ()=>{
    //         unsubscribable()
    //     }
    //     /**
    //      *  在Redux中，store.subscribe方法用于订阅store的状态变化。它接受一个回调函数作为参数，该回调函数会在每次状态变化时被调用。
    //      * 使用store.subscribe方法可以在应用中监听store的状态变化，并在状态变化时执行一些逻辑，例如更新UI或执行其他操作。
    //      */
    //     //让组件更新的方法
    //     // +组件第一次渲染完毕，将update方法放入事件池中
    //     // +返回的unsubscribable方法执行，可以把刚才放入事件池中的方法移除掉
    //     // console.log(unsubscribable)
    // }, [num])

    //写法2：使用随机数或时间戳
    let [_,setNum] = useState(0)
    useEffect(()=>{
        store.subscribe(()=>{
            setNum(+new Date())
        })
    },[])

    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </header>
        <VoteMain/>
        <VoteFooter/>
    </div>;
}

export default Vote


