/**
 * @Author liming
 * @Date 2023/8/1 11:43
 **/
import React from 'react'
import {NavBox} from './NavStyle'

// console.log(NavBox)
const Nav = () => {
    return <NavBox>
        <h2 className="title">购物商城</h2>
        <div>
            <a href="/home">首页</a>
            <a href="/rush">秒杀</a>
            <a href="/my">我的</a>
        </div>
    </NavBox>
}

export default Nav
