/**
 * @Author liming
 * @Date 2023/9/6 22:16
 **/
import React from "react";
import styled from "styled-components";
import { ErrorBlock, Button } from 'antd-mobile';

/* 组件的样式 */
const StyledDiv = styled.div`
    padding-top: 100px;
    font-size: 40px;

    .adm-error-block-image{
        height: 400px;
    }

    .adm-error-block-description,
    .adm-error-block-description-title{
        font-size: 28px;
    }

    .btn{
        margin-top: 50px;
        display: flex;
        justify-content: center;

        .adm-button{
            margin: 0 20px;
        }
    }
`;

const Page404 = function Page404({ navigate }) {
    return <StyledDiv>
        <ErrorBlock status="empty" title="您访问的页面不存在" description="去逛逛其他页面吧" />
        <div className="btn">
            <Button color="warning"
                    onClick={() => {
                        navigate(-1);
                    }}>
                返回上一页
            </Button>

            <Button color="primary"
                    onClick={() => {
                        navigate('/', { replace: true });
                    }}>
                回到首页
            </Button>
        </div>
    </StyledDiv>;
};
export default Page404;
