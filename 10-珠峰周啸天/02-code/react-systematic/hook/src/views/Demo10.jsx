import React, {useState, useEffect, useRef} from 'react'
import {Button} from 'antd'
import './Demo.less'

{/*写法1：不推荐*/}
// const Demo = props => {
//     let [num,setNum] = useState(0)
//     //基于ref={函数}的方式，可以把创建的DOM元素(或者子组件的实例)赋值给box变量——不推荐这样
//     let box;
//     useEffect(()=>{
//         console.log(box)
//     },[])
//     return <div className="demo">
//
//         <span className="num" ref={x=>box=x}>num:{num}</span>
//         <Button type="primary" size="small" onClick={() => {setNum(num + 1)}}>新增</Button>
//     </div>
// }

//写法2：也可以基于React.createRef创建ref对象来获取想要的内容(类组件、函数组件都可以用)
// const Demo = props => {
//     let [num,setNum] = useState(0)
//     //基于ref={函数}的方式，可以把创建的DOM元素(或者子组件的实例)赋值给box变量——不推荐这样
//     let box = React.createRef()
//     // console.log(box,'box')
//     useEffect(()=>{
//         console.log(box.current,'box.current')
//     },[])
//     return <div className="demo">
//         {/*写法1：不推荐*/}
//         <span className="num" ref={box}>num:{num}</span>
//         <Button type="primary" size="small" onClick={() => {setNum(num + 1)}}>新增</Button>
//     </div>
// }


//写法3：单独的hooks函数：useRef(但这种方式只能在函数式组件中去用)
let pre1,pre2
const Demo = props => {
    let [num,setNum] = useState(0)
    //基于ref={函数}的方式，可以把创建的DOM元素(或者子组件的实例)赋值给box变量——不推荐这样
    let box1 = useRef(null)
    let box2 = React.createRef()
    if(!pre1){
        //第一次Demo函数执行，把第一次创建的ref对象赋值给变量
        pre1 = box1;
        pre2 = box2;
    }else{
        //第二次Demo执行(组件更新)验证新创建的ref对象，和之前第一次创建的ref对象，是否一致
        console.log(pre1 === box1)   //true   useRef在组件每次更新的时候(函数重新执行),再次执行useRef方法的时候，还是之前的ref那个对象
        console.log(pre2 === box2)   //false  createRef在组件更新的时候，都会创建全新的ref对象，比较浪费性能

        //总结：类组件中，创建ref对象，我们基于React.createRef(没办法);但在函数组件中，为了保证性能，我们使用专属的useRef处理
    }
    // console.log(box1,'box1')
    useEffect(()=>{
        console.log(box1.current,'box1.current')
        console.log(box2.current,'box2.current')
    },[])
    return <div className="demo">
        {/*写法1：不推荐*/}
        <span className="num" ref={box1}>{num}</span>
        <span className="num" ref={box2}>哈哈哈</span>
        <Button type="primary" size="small" onClick={() => {setNum(num + 1)}}>新增</Button>
    </div>
}

export default Demo

