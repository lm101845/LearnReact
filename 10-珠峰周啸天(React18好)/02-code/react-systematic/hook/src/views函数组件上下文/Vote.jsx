import React, {useCallback, useState} from 'react'
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';
import ThemeContext from '@/ThemeContext'

const Vote = () => {
    let [supNum, setSupNum] = useState(10)
    let [oppNum, setOppNum] = useState(0)
    //只有第一次才创建函数堆内存，以后函数每次更新，change都是用的第一次定义的函数，就不会再重新定义函数了
    const change = useCallback(type => {
        if (type === 'sup') {
            setSupNum(supNum + 1)
            return
        }
        setOppNum(oppNum + 1)
    }, [supNum, oppNum])   //只要supNum,oppNum改变，就会创建新的change方法

    return <ThemeContext.Provider value={{
        supNum,
        oppNum,change
    }}>
        <div className="vote-box">
            <header className="header">
                <h2 className="title">React是很棒的前端框架</h2>
                <span className="num">{supNum + oppNum}</span>
            </header>
            <VoteMain/>
            <VoteFooter/>
        </div>
    </ThemeContext.Provider>
}

export default Vote


