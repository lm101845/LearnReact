import React from "react";
import { Skeleton } from 'antd-mobile';
import styled from "styled-components";

/* 组件样式 */
const StyledDiv = styled.div`
    padding: 0 10px;
    padding-top: 16px;

    .adm-skeleton-title{
        margin-top: 0;
    }
`;

const SkeletonAgain = function SkeletonAgain(props) {
    return <StyledDiv>
        <Skeleton.Title animated />
        <Skeleton.Paragraph animated lineCount={props.count} />
    </StyledDiv>;
};
SkeletonAgain.defaultProps = {
    count: 5
};
export default SkeletonAgain;