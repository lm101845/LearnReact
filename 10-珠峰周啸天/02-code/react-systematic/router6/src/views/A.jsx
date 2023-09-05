/**
 * @Author liming
 * @Date 2023/9/4 15:19
 **/
import React from 'react'
import styled from 'styled-components'
import {Link,Outlet} from "react-router-dom";

const DemoBox = styled.div`
  display: flex;

  .menu {
    a {
      color: #000;
      display: block;
      font-size: 16px;
    }
  }
`
const A = () => {
    return <DemoBox>
        <div className="menu">
            <Link to="/a/a1">A1</Link>
            <Link to="/a/a2">A2</Link>
            <Link to="/a/a3">A3</Link>
        </div>
        <div className="view">
            {/*Outlet路由容器：用来渲染二级(多级)路由匹配的内容*/}
            <Outlet></Outlet>
        </div>
    </DemoBox>
}

export default A
