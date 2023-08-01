/**
 * @Author liming
 * @Date 2023/8/1 11:43
 **/
import React from 'react'
import './Nav.less'
const Nav = () => {
    return <div className="box">
        <h2 className="title" style={{fontSize:'20px',fontWeight:700}}>购物商城</h2>
        <div className="list">
            <a href="">首页</a>
            <a href="">秒杀</a>
            <a href="">我的</a>
        </div>
    </div>
}

export default Nav
