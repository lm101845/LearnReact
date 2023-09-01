import React, {useContext, useEffect, useState} from 'react'
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
// import ThemeContext from '../ThemeContext'
import {connect} from 'react-redux'
import Test from "./Test";
const Vote = (props) => {
    let {supNum,oppNum} = props
    console.log(props,'测试props')
    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </header>
        <VoteMain/>
        <VoteFooter/>
        {/*<Test></Test>*/}
    </div>;
}

export default connect(state=>{
    // return {
    //     supNum:state.vote.supNum,
    //     oppNum:state.vote.oppNum
    // }
    return state.vote   //把所有属性都传递
})(Vote)
/**
 * connect(mapStateToProps,mapDispatchToProps)(我们要渲染的组件)
 * 1.mapStateToProps:可以获取到redux中的公共状态，把需要的信息作为属性，传递组件即可
 * 2.mapDispatchToProps:把需要派发的任务，当做属性传递给组件
 */


