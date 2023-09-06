import React, { useState, useEffect, useMemo } from "react";
import { flushSync } from 'react-dom';
import styled from "styled-components";
import { LeftOutline, MessageOutline, LikeOutline, StarOutline, MoreOutline } from 'antd-mobile-icons';
import { Badge, Toast, SpinLoading } from 'antd-mobile';
import { connect } from 'react-redux';
import actions from '../store/actions';
import SkeletonAgain from "../components/SkeletonAgain";
import API from "../api";

/* 组件的样式 */
const StyledDiv = styled.div`
    .content {
        overflow-x: hidden;
        margin: 0;
        padding-bottom: 45px;

        .img-place-holder {
            overflow: hidden;
            img {
                margin: 0;
                width: 100%;
                min-height: 100%;
            }
        }

        .meta {
            .avatar {
                display: inline-block;
                margin-top: 0;
                margin-bottom: 0;
            }
        }
    }

    /* 底部栏 */
    .tab-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 999;
        box-sizing: border-box;
        width: 100%;
        height: 45px;
        background: #DDD;
        display: flex;
        align-items: center;

        .back {
            box-sizing: border-box;
            width: 50px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            font-size: 20px;
            font-weight: 900;
            border-right: 1px solid #CCC;
        }

        .icons {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 25px;
            line-height: 25px;

            .adm-badge-wrapper,
            span {
                flex-grow: 1;
                text-align: center;
                font-size: 20px;
            }

            span {
                &:nth-last-of-type(1) {
                    color: #AAA;
                }

                &:nth-of-type(1) {
                    &.stored {
                        color: #108ee9;
                    }
                }
            }

            .adm-badge-wrapper {
                .adm-badge-fixed {
                    right: 12.5%;
                }

                .adm-badge {
                    background: none;

                    .adm-badge-content {
                        color: #555;
                    }
                }
            }
        }

        .adm-spin-loading{
            margin: 0 auto;
            width: 20px;
            height: 20px;
        }
    }
`;

const Detail = function Detail(props) {
    let { params: { id }, navigate, location, profile, storeList, queryLoginProfile, queryStoreList, removeStoreInfo } = props;

    /* ---以下和新闻相关--- */
    let [info, setInfo] = useState(null),
        [extra, setExtra] = useState(null);
    // 动态绑定CSS
    let link;
    const bindLink = (css) => {
        link = document.createElement('link');
        link.rel = "stylesheet";
        link.href = css;
        document.head.appendChild(link);
    };
    // 处理头图
    const bindBigImage = (url) => {
        let imgPlaceHolder = document.querySelector('.img-place-holder');
        if (!imgPlaceHolder) return;
        let tempImg = new Image();
        tempImg.src = url;
        tempImg.onload = () => {
            imgPlaceHolder.appendChild(tempImg);
        };
        tempImg.onerror = () => {
            imgPlaceHolder.parentNode.removeChild(imgPlaceHolder);
        };
    };
    // 第一次渲染：从服务器获取数据
    useEffect(() => {
        (async () => {
            try {
                let res = await API.queryNewsInfo(id);
                flushSync(() => {
                    setInfo(res);
                    Array.isArray(res.css) && bindLink(res.css[0]);
                });
                // 状态更改&视图更新完毕后
                bindBigImage(res.image);
            } catch (_) { }
        })();

        // 组件释放的时候：移除动态绑定的样式
        return () => {
            if (link) document.head.removeChild(link);
        };
    }, []);
    useEffect(() => {
        (async () => {
            try {
                let res = await API.queryNewsExtra(id);
                setExtra(res);
            } catch (_) { }
        })();
    }, []);

    /* ---以下和收藏相关--- */
    let [loading, setLoading] = useState(false);
    // 计算当前文章是否被收藏
    let isStored = useMemo(() => {
        if (!storeList) return false;
        return storeList.some(item => item.news.id === id);
    }, [storeList]);
    // 第一次渲染完毕：获取登陆者信息 & 收藏信息
    useEffect(() => {
        (async () => {
            if (!profile) {
                // 没有登录者信息，我们派发校验一次
                let res = await queryLoginProfile();
                profile = res.profile;
            }
            // 只有登录了，我们再获取收藏信息
            if (profile && !storeList) {
                await queryStoreList();
            }
        })();
    }, []);
    // 新增或者移除收藏
    const storeHandle = async () => {
        // 首先校验是否登录
        if (!profile) {
            Toast.show({
                icon: 'fail',
                content: '请您先登录'
            });
            navigate(`/login?to=${location.pathname}`, { replace: true });
            return;
        }
        // 当前是收藏的，此时我们移除收藏
        if (isStored) {
            setLoading(true);
            let item = storeList.find(item => item.news.id === id);
            try {
                let { code } = await API.removeStoreInfo(item?.id);
                if (+code !== 0) {
                    Toast.show({
                        icon: 'fail',
                        content: '移除收藏失败'
                    });
                } else {
                    Toast.show({
                        icon: 'success',
                        content: '移除收藏成功'
                    });
                    removeStoreInfo(item?.id);
                }
            } catch (_) { }
            setLoading(false);
            return;
        }
        // 当前没有被收藏，则我们收藏
        setLoading(true);
        try {
            let { code } = await API.addStoreInfo(id);
            if (+code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '收藏失败'
                });
            } else {
                await queryStoreList();
                Toast.show({
                    icon: 'success',
                    content: '收藏成功'
                });
            }
        } catch (_) { }
        setLoading(false);
    };

    return <StyledDiv>
        {/* 新闻内容 */}
        {info ?
            <div className="content" dangerouslySetInnerHTML={{
                __html: info.body
            }}></div> :
            <SkeletonAgain />
        }
        {/* 底部图标 */}
        <div className="tab-bar">
            <div className="back"
                onClick={() => {
                    navigate(-1);
                }}>
                <LeftOutline />
            </div>
            <div className="icons">
                <Badge content={extra ? extra.comments : 0}><MessageOutline /></Badge>
                <Badge content={extra ? extra.popularity : 0}><LikeOutline /></Badge>
                <span className={isStored ? 'stored' : ''}
                    onClick={storeHandle}>
                    {loading ? <SpinLoading /> : <StarOutline />}
                </span>
                <span><MoreOutline /></span>
            </div>
        </div>
    </StyledDiv>;
};
export default connect(
    state => state.base,
    actions.base
)(Detail);