import React from "react";
import styled from "styled-components";
import { SwipeAction } from 'antd-mobile';
import NavBarAgain from '../components/NavBarAgain';
import NewsItem from '../components/NewsItem';
import SkeletonAgain from '../components/SkeletonAgain';

/* 组件的样式 */
const StyledDiv = styled.div`
    .box {
        padding:15px;
    }
`;

const MyStore = function MyStore() {
    return <StyledDiv>
        <NavBarAgain title="我的收藏" />
        <SkeletonAgain />
        <div className="box">
            <SwipeAction rightActions={[{
                key: 'delete',
                text: '删除',
                color: 'danger',
                onClick: () => { }
            }]}>
                <NewsItem info={{}} />
            </SwipeAction>
        </div>
    </StyledDiv>;
};
export default MyStore;