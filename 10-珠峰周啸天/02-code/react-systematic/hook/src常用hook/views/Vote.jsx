import React, {useState} from 'react'
import {Button} from 'antd'
import './Vote.less'

const Vote = props => {
    //执行一次state,把需要的状态信息都放在对象中统一管理
    // +执行setState方法的时候，传递的是啥值，就把状态统一改为啥值

    //官方不建议这样写，官方建议：需要多个状态，就把useState执行多次
    // let [state,setState] = useState({
    //     supNum:100,
    //     oppNum:5
    // })

    //建议写法
    let [supNum,setSupNum] = useState(10)
    let [oppNum,setOppNum] = useState(5)

    const handle = type =>{
        if(type === 'sup'){
            // setState({
            //     ...state,    //因为函数式组件它不支持部分状态更新，所以要写...state
            //     supNum: state.supNum + 1
            // })
            setSupNum(supNum + 1)
            return
        }
        // setState({
        //     ...state,
        //     oppNum: state.oppNum + 1
        // })
        setOppNum(oppNum + 1)
    }
    return <div className="vote-box">
        <div className="header">
            <h2 className="title">{props.title}</h2>
            {/*<span>{state.supNum + state.oppNum}</span>*/}
            <span>{supNum + oppNum}</span>
        </div>

        <div className="main">
            {/*<p>支持人数：{state.supNum}人</p>*/}
            {/*<p>反对人数：{state.oppNum}人</p>            */}
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>

        <div className="footer">
            <Button type="primary" onClick={handle.bind(null,'sup')}>支持</Button>
            <Button type="primary" danger onClick={handle.bind(null,'opp')}>反对</Button>
        </div>
    </div>
}

export default Vote
