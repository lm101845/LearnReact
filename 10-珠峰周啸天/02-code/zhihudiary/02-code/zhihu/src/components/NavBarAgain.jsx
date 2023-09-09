/**
 * @Author liming
 * @Date 2023/9/7 11:21
 **/
import React from 'react'
import {NavBar} from 'antd-mobile'
import {useNavigate,useLocation,useSearchParams} from "react-router-dom";
import PropTypes from "prop-types";
import './NavBarAgain.less'
//对UI组件库中的NavBar做了二次封装
//NavBarAgain里面没有路由信息，但我们没有封装useRouter，所以用Hook来获取
const NavBarAgain = (props) => {
    let {title} = props
    const navigate = useNavigate()
    const location = useLocation()
    const [usp] = useSearchParams()
    const handleBack = ()=>{
        //特殊：登录页 & to的值是/detail/xxx
        let to = usp.get('to')
        if(location.pathname === '/login' && /^\/detail\/\d+$/.test(to)){
            navigate(to,{replace:true})
            return
        }
        navigate(-1)
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
