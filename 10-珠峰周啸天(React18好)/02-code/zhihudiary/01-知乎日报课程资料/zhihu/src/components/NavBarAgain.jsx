import React from "react";
import { NavBar } from 'antd-mobile';
import styled from "styled-components";
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

/* 组件的样式 */
const StyledDiv = styled.div`
    .navbar-again-box {
        padding: 0 10px;
        height: 40px;

        .adm-nav-bar-title {
            font-size: 16px;
        }

        .adm-nav-bar-back-arrow {
            font-size: 18px;
        }
    }
`;

const NavBarAgain = function NavBarAgain(props) {
    let { title } = props;
    const navigate = useNavigate(),
        location = useLocation(),
        [usp] = useSearchParams();

    const handle = () => {
        let to = usp.get('to');
        if (location.pathname === '/login' && to && to.includes('/detail')) {
            navigate(to, { replace: true });
            return;
        }
        navigate(-1);
    };

    return <StyledDiv>
        <NavBar className="navbar-again-box" onBack={handle}>
            {title}
        </NavBar>
    </StyledDiv>;
};
NavBarAgain.defaultProps = {
    title: '个人中心'
};
export default NavBarAgain;