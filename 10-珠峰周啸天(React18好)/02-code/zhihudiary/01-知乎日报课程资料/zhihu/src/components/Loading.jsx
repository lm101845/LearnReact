import React from "react";
import { Mask, SpinLoading } from 'antd-mobile';
import styled from "styled-components";

/* 组件的样式 */
const StyledDiv = styled.div`
    .adm-mask-content{
        position: absolute;
        left: 0;
        top: 50%;
        z-index: 999;
        transform: translateY(-50%);
        width: 100%;
        text-align: center;

        .adm-spin-loading{
            display: inline-block;
        }

        .text{
            margin-top: 10px;
            font-size: 12px;
            color: rgba(255,255,255,.5);
            letter-spacing: 5px;
        }
    }
`;

export default function Loading() {
    return <StyledDiv>
        <Mask>
            <SpinLoading color='primary' />
            <p className="text">正在加载中...</p>
        </Mask>
    </StyledDiv>;
};