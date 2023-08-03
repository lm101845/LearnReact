import React, {useContext, useEffect, useState} from 'react'
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from '../ThemeContext'

const Vote = () => {

    const {store} = useContext(ThemeContext)
    //获取容器中的公共状态
    let {supNum, oppNum} = store.getState().vote


    //写法2：使用随机数或时间戳
    let [_,forceUpdate] = useState(0)
    useEffect(()=>{
        console.log('Vote组件useEffect方法执行了')
        store.subscribe(()=>{
            forceUpdate(+new Date())
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


