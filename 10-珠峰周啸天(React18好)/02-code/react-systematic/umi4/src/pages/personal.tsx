/**
 * @Author liming
 * @Date 2023/9/13 15:45
 **/
import React from 'react'
import {NavLink,Outlet} from "umi";
import styled from 'styled-components'

/*组件样式*/
const StyledPersonalBox = styled.div`
  .menu{
    a{
      display: block;
      line-height: 35px;
      font-size: 16px;
      color: #000;
      &.active{
        color: green;
      }
    }
  }
`
const PersonalPage = () => {
    return (
        <StyledPersonalBox>
            <div className="menu">
                <NavLink to="/personal/order">订单管理</NavLink>
                <NavLink to="/personal/profile">个人信息</NavLink>
            </div>

            <div className="content">
                <Outlet/>
            </div>
        </StyledPersonalBox>

    );
};

export default PersonalPage;
