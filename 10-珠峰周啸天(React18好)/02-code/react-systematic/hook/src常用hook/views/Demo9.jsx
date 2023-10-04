import React, {useState, useLayoutEffect, useEffect} from 'react'
import {Button} from 'antd'
import './Demo.less'

/**
 * 因为 useEffect 是渲染完之后异步执行的，所以会导致 hello world 先被渲染到了屏幕上，再变成 world hello，就会出现闪烁现象。
 * 而 useLayoutEffect 是渲染之前同步执行的，
 * 所以会等它执行完再渲染上去，就避免了闪烁现象。也就是说我们最好把操作 dom 的相关操作放到 useLayouteEffect 中去，避免导致闪烁。
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Demo = props => {
    console.log('render函数执行了')
    let [num, setNum] = useState(0)
    // useEffect(() => {
    // useLayoutEffect(() => {
    //     if (num === 0) {
    //         setNum(+String(Math.random()).substring(2))
    //     }
    // }, [num])

    useEffect(()=>{
        console.log('useEffect，第二个输出',num)
        console.log(document.querySelector('.num'),'useEffect')
    },[num])

    /**
     * useLayoutEffect会阻塞浏览器渲染真实DOM,优先执行Effect链表中的callback
     * useEffect不会阻塞浏览器渲染真实DOM，在渲染真实DOM的同时，去执行Effect链表中的callback
     *   +useLayoutEffect中设置的callback要优先于useEffect去执行
     *   +在两者设置的callback中，依然可以获取DOM元素[原因：真实DOM已经创建了]
     *   +如果在callback函数中又修改了状态值【视图又要更新】
     *      +useEffect:浏览器肯定把第一次的真实DOM已经绘制了，再去渲染第二次真实DOM
     *      +useLayoutEffect：浏览器是把两次真实DOM的渲染，合并在一起进行渲染
     */
    useLayoutEffect(()=>{
        console.log('useLayoutEffect优于useEffect执行，第一个输出',num)
        console.log(document.querySelector('.num'),'useLayoutEffect')
    },[num])
    return <div className="demo" style={{backgroundColor: num === 0 ? 'red' : 'green'}}>
        <span className="num" >{num}</span>
        <Button type="primary" size="small" onClick={() => {
            setNum(0)
        }}>新增</Button>
    </div>
}
export default Demo

