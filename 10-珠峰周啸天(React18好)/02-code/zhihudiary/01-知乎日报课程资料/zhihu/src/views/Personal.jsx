import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { RightOutline } from 'antd-mobile-icons';
import NavBarAgain from '../components/NavBarAgain';


/* 组件的样式 */
const StyledDiv = styled.div`
    .baseInfo {
        box-sizing: border-box;
        margin: 20px 0;
        .pic {
            display: block;
            margin: 0 auto;
            width: 86px;
            height: 86px;
            border-radius: 50%;
        }
        .name {
            line-height: 50px;
            font-size: 18px;
            text-align: center;
            color: #000;
        }
    }
    .tab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #000;
        border-bottom: 1px solid #EEE;
    }
`;

const Personal = function Personal() {
    return <StyledDiv>
        <NavBarAgain title="个人中心" />
        <div className="baseInfo">
            <Link to='/update'>
                <img className="pic" src='http://127.0.0.1:7100/timg.jpg' alt="" />
                <p className="name">哈哈哈哈</p>
            </Link>
        </div>
        <div>
            <Link to='/mystore' className="tab">
                我的收藏
                <RightOutline />
            </Link>
            <div className="tab">
                退出登录
                <RightOutline />
            </div>
        </div>
    </StyledDiv>;
};
export default Personal;