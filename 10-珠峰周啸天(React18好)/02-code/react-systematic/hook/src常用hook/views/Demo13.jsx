import React, {useState, useCallback} from 'react'
import {Button} from 'antd'
import './Demo1.less'

//子组件
// class Child extends React.Component {
class Child extends React.PureComponent {
    render() {
        console.log('类式子组件', this.props.handle)
        return <div>我是子组件</div>
    }
}

const Child2 = React.memo((props)=>{
    console.log('函数式子组件')
})

//父组件
//诉求：当父组件更新(第2次及以上)的时候，因为传递给子组件的属性仅仅是一个函数[特点：基本应该算是不变的]，所以不想再让子组件也跟着跟新了
// + 第一条：传递给子组件的属性(函数),每一次需要时相同的堆内存地址
// + 第二条，在子组件内部也要做一个处理，验证父组件传递的属性是否发生改变，如果没有变化，则让子组件不能更新，有变化才需要更新
//   我们让它继承PureComponent即可[在shouldComponentUpdate中对新老属性做了浅比较]——类式组件
//   在函数式组件中，使用React.memo函数包一下即可
let prev
const Demo = props => {
    let [x, setX] = useState(0)
    //const handle = ()=>{}   //第一次:0x001  第二次:0x002(创建了新的handle)
    /**
     * const xxx = useCallback(callback,[依赖])
     *  +组件第一次渲染，useCallback执行，创建一个函数"callback",赋值给xxx
     *  +组件后续每一次更新，判断依赖的状态值是否改变。如果改变，则重新创建新的函数堆，赋值给xxx；
     *  +但是如果依赖的状态没有更新或者没有设置依赖"[]",则xxx获取的一直是第一次创建的函数堆，不会创建新的函数出来
     *  +或者说，基于useCallback,可以始终获取第一次创建函数的堆内存地址(或者说函数的引用)
     */
        // const handle = useCallback(()=>{
        //
        // },[])
        // if(!prev){
        //     prev = handle
        // }else{
        //     console.log(handle === prev)
        //     //false  新的handle和上一次的prev(里面存了第一次的handle)是false
        //     //函数组件的每次更新，都是把函数重新执行
        //     //  +产生一个新的闭包
        //     //  +在闭包中所有创建函数的操作，都会：重新创建新的堆内存[也就是函数都会重新创建]
        //     // 引入useCallback以后，结果就为true了
        // }

    const handle = useCallback(() => {
            console.log('123')
        }, [])
    return <div className="vote-box">
        <Child handle={handle}/>
        <Child2 handle={handle}/>
        <div className="main">
            <p>{x}</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={() => setX(x + 1)}>累加</Button>
        </div>
    </div>
}
export default Demo

