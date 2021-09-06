/*
 * @Author: liming
 * @Date: 2021-09-05 23:40:15
 * @LastEditTime: 2021-09-06 16:20:54
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\components\03_hooks\index.jsx
 */
import React from 'react'
import ReactDOM from 'react-dom'

// 类式组件
// class Demo extends React.Component {
//     state = { count: 0 }

//     //使用ref容器
//     myRef = React.createRef()

//     add = () => {
//         this.setState(state => ({ count: state.count + 1 }))
//     }

//     unmount = () => {
//         ReactDOM.unmountComponentAtNode(document.getElementById('root'))
//     }
//     componentDidMount() {
//         this.timer = setInterval(() => {
//             // 你到时候要卸载定时器，就必须要先给它起个名字，把id挂载到实例自身
//             this.setState(state=>({count:state.count+1}))
//         },1000)
//     }

//     componentWillUnmount() {
//         clearInterval(this.timer)
//     }

//     show = ()=> {
//         alert(this.myRef.current.value)
//     }
//     render() {
//         return (
//             <div>
//                 <input type="text" ref={this.myRef} />
//                 {/* 这个赋值语句是放在自身了，所以使用this */}
//                 <h2>当前求和为{this.state.count}</h2>
//                 <button onClick={this.add}>点我+1</button>
//                 <button onClick={this.unmount}>卸载组件</button>
//                 {/* 组件卸载了，但是定时器没有停，则意味着组件的更新依然在继续，就会报错,所以组件卸载之前要先停掉定时器 */}
//                 {/* 就相当于你已经死了，可是你却依旧在上班，这个就不合理 */}
//                 <button onClick={ this.show}>点击提示数据</button>
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
    // console.log(count,setCount);
      
    const [name, setName] = React.useState('tom')
    
    //注意：函数式组件里面不能直接写生命周期钩子
    // componentDidMount() {

    // }

    //定义这个函数也是无济于事的！！！！
    // function componentDidMount() {
    //     console.log('@@@@');
    // }

    const myRef = React.useRef()
    // 使用钩子函数才行
    React.useEffect(() => {
        //组件一挂载就输出@@@,就相当于componentDidMount
        // 而我点击按钮更新组件的时候，它也输出@@@,它也相当于componentDidUpdate
        // 这个钩子不仅仅在组件挂载的时候执行，更新的时候它也执行！！！！
        // console.log('@@@');
        let timer = setInterval(() => {
            setCount(count => count + 1)
            // 在这个函数里面写，到时候定时器会越来越快！！！！
        },1000)
        // 注意：useEffect这个函数所返回的那个函数就相当于componentWillOnMount
        return () => {
            console.log('@@@@@');
            // 就在这里清除定时器
            clearInterval(timer)
        } 
    // }, [count])
        
    }, [])
    // useEffect函数其实还可以传入第二个参数，这里我们写空数组，此时这个useEffect函数就相当于componentDidMount了
    // 如果你不写空数组[],它就监测所有人，那么只要你只要一更新，它就调用useEffect函数
    // 如果你写了空数组[]，那么它所有人都不监测了


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

    //卸载组件的回调
    function onmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    }

    //提示输入的回调
    function show() {
        alert(myRef.current.value)
    }
    return (
        <div>
            <input type="text" ref={myRef}/>
            <h2>当前求和为:{count}</h2>
            <h2>我的名字是：{ name}</h2>
            <button onClick={add}>点我+1</button>
            <button onClick={changeName}>点我改名</button>
            <button onClick={onmount}>卸载组件</button>
            <button onClick={ show}>点我提示数据</button>
        </div>
    )
}

export default Demo
