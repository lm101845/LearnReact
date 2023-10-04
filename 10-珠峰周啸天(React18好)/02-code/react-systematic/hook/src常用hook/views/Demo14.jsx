import React, {useEffect, useState} from 'react'
import {Button} from 'antd'
import './Demo.less'

/**
 * 自定义hook
 *   作用：提取封装一些公共的处理逻辑
 *   玩法：创建一个函数，名字需要时useXxx,后期就可以在组件中调用这个方法
 */

const usePartialState = (initialValue) => {
    let [state,setState] = useState(initialValue)
    //usePartialState内部还是用React内部提供的setState，只不过包了一层
    //这个setState不支持部分状态修改，我们在它的基础上给它进行加强
    //setPartial：我们希望setPartial这个方法支持部分状态更改
    const setPartial = (partialState)=>{
        setState({
            ...state,   //把这个...state进行封装
            ...partialState
        })
    }
    return [state,setPartial]
}


//自定义hook,在组件第一次渲染完毕后，统一干点啥事
//类似于Vue中的mixins函数
const useDidMount = title=>{
    if(!title) title = 'React系统课'
    //基于React内置的hook函数，实现需求即可
    useEffect(()=>{
        document.title = title
    },[])
}

//改个名字，就可以在条件里面使用了
const AAA = title=>{
    if(!title) title = 'React系统课'
    //基于React内置的hook函数，实现需求即可
    useEffect(()=>{
        document.title = title
    },[])
}

const Demo = props => {
    // let [state, setState] = useState({
    let [state, setPartial] = usePartialState({
        supNum: 10,
        oppNum: 5
    })

    useDidMount("哈哈哈哈")
    const handle = type => {
        if (type === 'sup') {
            // setState({
            //     ...state,   //...state不能丢！！
            //     supNum: state.supNum + 1
            // })
            setPartial({
                supNum: state.supNum + 1
            })
            return
        }
        // setState({
        //     ...state,   //...state不能丢！！
        //     oppNum: state.oppNum + 1
        // })
        setPartial({
            oppNum: state.oppNum + 1
        })
    }

    //hook函数(包含自定义hook)是不能作用在条件里面的，必须写在最外面，而自定义hook则没有这个限制
    if(true){
        // useDidMount("嘿嘿嘿")
        AAA("嘿嘿嘿")
    }
    return <div className="vote-box">
        <div className="main">
            <p>支持人数：{state.supNum}人</p>
            <p>反对人数：{state.oppNum}人</p>
        </div>

        <div className="footer">
            <Button type="primary" onClick={handle.bind(null, 'sup')}>支持</Button>
            <Button type="primary" danger onClick={handle.bind(null, 'opp')}>反对</Button>
        </div>
    </div>
}

export default Demo

