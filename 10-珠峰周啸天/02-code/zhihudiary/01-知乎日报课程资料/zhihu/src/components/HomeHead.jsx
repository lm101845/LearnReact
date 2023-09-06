import React, { useMemo, useEffect } from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';
import defaultPic from '../assets/images/timg.jpg';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import actions from '../store/actions';

/* 组件的样式 */
const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;

    .avatar{
        width: 34px;
        height: 34px;
        border-radius: 50%;
        overflow: hidden;

        img{
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    .text{
        display: flex;

        .time{
            margin-right: 15px;

            span{
                display: block;
                line-height: 17px;
                text-align: center;
                font-size: 12px;

                &:nth-child(1){
                    font-size: 16px;
                }
            }
        }

        .title{
            padding-left: 15px;
            line-height: 34px;
            font-size: 20px;
            border-left: 1px solid #DDD;
        }
    }
`;

const HomeHead = function HomeHead(props) {
    const navigate = useNavigate();

    // 接收属性&处理数据
    let { today, profile, queryLoginProfile } = props;
    let time = useMemo(() => {
        let [, month = '00', day = '00'] = String(today).match(/^\d{4}(\d{2})(\d{2})$/) || [];
        let area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return {
            month: area[+month] + '月',
            day
        };
    }, [today]);

    // 第一次渲染完毕：如果没有登录者信息，我们需要派发一次
    useEffect(() => {
        if (!profile) queryLoginProfile();
    }, []);

    return <StyledHeader>
        <div className="text">
            <div className="time">
                <span>{time.day}</span>
                <span>{time.month}</span>
            </div>
            <h2 className="title">知乎日报</h2>
        </div>

        <div className="avatar"
            onClick={() => {
                navigate('/personal');
            }}>
            <img src={profile ? profile.pic : defaultPic} alt="" />
        </div>
    </StyledHeader>;
};
HomeHead.propTypes = {
    today: PropTypes.string.isRequired
};
export default connect(
    state => state.base,
    actions.base
)(HomeHead);