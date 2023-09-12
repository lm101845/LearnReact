import React, {useContext, useEffect, useState} from 'react'
import './Vote.less';
import {Button} from "antd";
import {connect} from 'dva'

const Vote = (props) => {
    const {supNum, oppNum,dispatch} = props
    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </header>
        <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>
        <div className="footer">
            <Button type="primary" onClick={() => {
                dispatch({
                    type: 'vote/supportAsync'
                })
            }}>支持</Button>
            <Button type="primary" danger onClick={() => {
                dispatch({
                    type: 'oppose/opposeAsync'
                })
            }}>反对</Button>
        </div>
    </div>;
}

export default connect(state=>state.vote)(Vote)



