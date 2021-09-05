/*
 * @Author: liming
 * @Date: 2021-09-05 23:40:15
 * @LastEditTime: 2021-09-06 00:25:17
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\03_hooks\index.jsx
 */
import React from 'react'

// 类式组件
// class Demo extends React.Component {
//     state = { count: 0 }

//     add = () => {
//         this.setState(state => ({ count: state.count + 1 }))
//     }
//     render() {
//         return (
//             <div>
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//             </div>
//         )
//     }
// }

//函数式组件
// 注意：函数式组件连自己的this都没有，你怎么this.state？？？？？
// 问题来了：我们怎么让函数式组件用上state呢？？？？——非常简单，使用hooks中的一个：useState
function Demo() {
    // 这个Demo函数调用1+n次

    const [count, setCount] = React.useState(10)
    // 这行代码React底层做了处理，虽然调用了1+n次，但是不会因为你的再次调用而把count给覆盖了

    // 这个是数组的解构赋值
    // const a = React.useState()
    // 这个a是一个数组，里面只有2个元素，第1个是你想要的状态，第2个是你想要更新的方法
    console.log(count,setCount);
      
    const [name, setName] = React.useState('tom')
    
    // 如果你的状态一变多，那你就必然要写很多的useState！！！
    //加的回调
    function add() {
        // console.log('你点击了加号');
        // setCount(99)
        // setCount(count+1)
        setCount(count => count+1 )
    }

    function changeName() {
        setName('jack')
    }
    return (
        <div>
            <h2>当前求和为:{count}</h2>
            <h2>我的名字是：{ name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={ changeName}>点我改名</button>
        </div>
    )
}

export default Demo
