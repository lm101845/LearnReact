/**
 * @Author liming
 * @Date 2023/9/5 8:14
 **/
import React from 'react'
import styled from 'styled-components'
import {NavLink} from "react-router-dom";

const NavBox = styled.nav`
  a {
    margin-left: 10px;
    color: #000;
    font-size: 32px;
    &.active{
      color:red
    }
  }
`

const HomeHead = () => {
    {/*导航部分*/}
    return <NavBox>
        <NavLink to="/a">A</NavLink>
        <NavLink to="/b">B</NavLink>
        <NavLink to="/c">C</NavLink>
    </NavBox>
}

export default HomeHead
