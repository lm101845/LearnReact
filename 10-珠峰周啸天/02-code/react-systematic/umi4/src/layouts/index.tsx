//这个就相当于页面入口，进来就渲染这个layout
import {NavLink, Outlet} from 'umi';
import styled from 'styled-components'
import React from "react";
/*样式*/
const StyledLayoutBox = styled.div`
  padding: 20px;
  .nav-box{
    height: 50px;
    border-bottom:1px solid #ddd ;
    a{
      margin-right: 15px;
      line-height: 50px;
      color: #000;
      font-size: 18px;
      &.active{
        color: red;
      }
    }
  }
`
export default function Layout() {
    return (
            <StyledLayoutBox>
                <nav className="nav-box">
                    <NavLink to="/">首页</NavLink>
                    <NavLink to="/demo/1">测试页</NavLink>
                    <NavLink to="/personal">个人中心页</NavLink>
                </nav>
                <Outlet/>
            </StyledLayoutBox>
    );
}
