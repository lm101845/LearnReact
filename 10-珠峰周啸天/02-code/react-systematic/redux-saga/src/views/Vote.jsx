import React, {useContext, useEffect, useState} from 'react'
import './Vote.less';
import {useSelector, useDispatch} from 'react-redux'
import * as TYPES from '../store/action-types'
import {Button} from "antd";

const Vote = () => {
    const {supNum, oppNum} = useSelector(state => state.vote)
    const dispatch = useDispatch()
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
                    type: TYPES.VOTE_SUP
                })
            }}>同步支持</Button>
            <Button type="primary" onClick={() => {
                dispatch({
                    type: TYPES.VOTE_SUP + '@SAGA@'
                })
            }}>异步支持</Button>
            <Button type="primary" danger onClick={() => {
                dispatch({
                    type: TYPES.VOTE_OPP
                })
            }}>同步反对</Button>
            <Button type="primary" danger onClick={() => {
                dispatch({
                    type: TYPES.VOTE_OPP + '@SAGA@'
                })
            }}>异步反对</Button>
        </div>
    </div>;
}

export default Vote



