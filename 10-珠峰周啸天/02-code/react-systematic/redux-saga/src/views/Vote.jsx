import React, {useContext, useEffect, useState} from 'react'
import './Vote.less';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import {connect} from 'react-redux'
import Test from "./Test";
const Vote = (props) => {
    let {supNum,oppNum} = props
    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </header>
        <VoteMain/>
        <VoteFooter/>
    </div>;
}

export default connect(state=>{
    return state.vote   //把所有属性都传递
})(Vote)



