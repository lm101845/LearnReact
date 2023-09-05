/**
 * @Author liming
 * @Date 2023/9/5 8:14
 **/
import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom";

const NavBox = styled.nav`
  a {
    margin-left: 10px;
    color: #000;
    font-size: 32px;
  }
`

const HomeHead = () => {
    {/*导航部分*/}
    return <NavBox>
        <Link to="/a">A</Link>
        <Link to="/b">B</Link>
        <Link to="/c">C</Link>
    </NavBox>
}

export default HomeHead
