/**
 * @Author liming
 * @Date 2023/9/7 11:21
 **/
import React from 'react'
import {NavBar} from 'antd-mobile'
import PropTypes from "prop-types";
import './NavBarAgain.less'
//对UI组件库中的NavBar做了二次封装
const NavBarAgain = (props) => {
    let {title} = props
    const handleBack = ()=>{
        //...
    }
    return <div>
        <NavBar className="navbar-again-box" onBack={handleBack}>{title}</NavBar>
    </div>
}

NavBarAgain.defaultProps = {
    title:'个人中心'
}
NavBarAgain.propTypes = {
    title:PropTypes.string
}

export default NavBarAgain
