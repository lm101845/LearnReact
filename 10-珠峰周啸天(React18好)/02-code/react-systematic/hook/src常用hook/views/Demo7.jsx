import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import './Demo.less'
//https://juejin.cn/post/7083308347331444750
/**第2个参数：
 * 不传值 componentDidMount + componentDidUpdate
 * 传空数组 componentDidMount
 * 数组里传特定值：componentDidMount + 这个特定值变化
 * 有返回函数 componentWillUnmount
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Demo = props => {
    let [num,setNum] = useState(0)
    let [x,setX] = useState(100)

    // useEffect(() => {
    //     console.log('执行副作用');   // 普通函数，执行副作用，可以实现componentDidMount、componentDidUpdate
    //     return () => {             // return函数, 组件销毁时清除副作用，可以实现componentWillUnmount
    //         console.log("清除副作用");
    //     };
    // }, [num]);

    useEffect(() => {
        console.log(`不传值`);
    });

    // useEffect(() => {
    //     setTimeout(() => {
    //         setNum(num + 1)
    //     }, 1000);
    //     console.log(`第二个参数: 不传值, 第 ${num} 次执行`);
    // });

    // useEffect(() => {
    //     setTimeout(() => {
    //         setNum(num + 1)
    //     }, 1000);
    //     console.log(`@@@第二个参数: 传空数组, 第 ${num} 次执行`);
    // },[]);

    const handle = () => {
        setNum(num + 1)
    }
    return <div className="demo">
        <span className="num">num:{num}</span>
        <Button type="primary" size="small" onClick={handle}>新增</Button>
    </div>
}

export default Demo
