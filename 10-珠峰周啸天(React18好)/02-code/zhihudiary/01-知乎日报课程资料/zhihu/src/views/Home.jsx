import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Swiper, Divider, DotLoading, Image } from 'antd-mobile';
import HomeHead from "../components/HomeHead";
import NewsItem from "../components/NewsItem";
import SkeletonAgain from "../components/SkeletonAgain";
import _ from '../assets/utils';
import API from '../api';

/* 组件的样式 */
const StyledDiv = styled.div`
    .banner-box{
        height: 375px;
        background: #EEE;

        .adm-swiper{
            height: 100%;
        }

        .adm-swiper-item{
            position: relative;
            
            .adm-image,
            img{
                display: block;
                width: 100%;
                height: 100%;
            }

            .content{
                position: absolute;
                bottom: 20px;
                left: 0;
                z-index: 999;
                box-sizing: border-box;
                padding: 0 10px;
                width: 100%;
                
                .title{
                    font-size: 18px;
                    color: #FFF;
                    line-height: 28px;
                }

                .author{
                    font-size: 12px;
                    color: rgba(255,255,255,.7);
                    line-height: 28px;
                }
            }
        }

        .adm-swiper-indicator{
            left: auto;
            transform: none;
            right: 12px;
            bottom: 12px;

            .adm-page-indicator-dot{
                margin-right: 6px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: rgba(255,255,255,.5);

                &.adm-page-indicator-dot-active{
                    width: 18px;
                    border-radius: 3px;
                    background: #FFF;
                }
            }
        }
    }

    .news-box{
        margin-top: 20px;
        padding: 0 10px;

        .adm-divider-horizontal{
            font-size: 12px;
        }
    }

    .load-more{
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 12px;
        color: #999;
        background: #EEE;
        letter-spacing: 3px;
    }
`;

const Home = function Home({ navigate }) {
    // 定义状态
    let [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}')),
        [bannerList, setBannerList] = useState([]),
        [newsList, setNewsList] = useState([]);
    let loadMoreBox = useRef(null);
    let isRun = false;

    // 第一次渲染完毕：从服务器获取需要的数据
    useEffect(() => {
        const initData = async () => {
            try {
                let { date, stories, top_stories } = await API.queryNewsLatest();
                setToday(date);
                setBannerList(top_stories);
                setNewsList([{
                    date,
                    stories
                }]);
            } catch (_) { }
        };
        initData();
    }, []);

    // 第一次渲染完毕：创建监听器对加载更多盒子进行处理
    useEffect(() => {
        let ob = new IntersectionObserver(async ([item]) => {
            if (item.isIntersecting) {
                // 见到了Loding盒子:加载以往的数据即可
                if (isRun) return;
                isRun = true;
                try {
                    let time = newsList[newsList.length - 1].date;
                    let result = await API.queryNewsBefore(time);
                    newsList.push(result);
                    setNewsList([...newsList]);
                } catch (_) { }
                isRun = false;
            }
        });
        ob.observe(loadMoreBox.current);

        // 组件每一次更新，在产生新的闭包之前，都会先把这个函数执行「组件销毁后也会执行」
        return () => {
            if (loadMoreBox.current) ob.unobserve(loadMoreBox.current);
            ob = null;
        };
    }, [newsList]);

    return <StyledDiv>
        {/* 头部 */}
        <HomeHead today={today} />

        {/* 轮播图 */}
        <div className="banner-box">
            {bannerList.length > 0 ? <Swiper autoplay loop>
                {bannerList.map(item => {
                    let { id, title, image, hint } = item;
                    return <Swiper.Item key={id}
                        onClick={() => {
                            navigate(`/detail/${id}`);
                        }}>
                        <Image src={image} lazy />
                        <div className="content">
                            <h3 className="title">{title}</h3>
                            <p className="author">{hint}</p>
                        </div>
                    </Swiper.Item>;
                })}
            </Swiper> : null}
        </div>

        {/* 新闻列表 */}
        {newsList.length === 0 ?
            <SkeletonAgain /> :
            <>
                {newsList.map((item, index) => {
                    let { date, stories } = item;
                    return <div className="news-box" key={date}>
                        {index > 0 ? <Divider contentPosition="left">
                            {_.formatTime(date, '{1}月{2}日')}
                        </Divider> : null}
                        <div className="news-list">
                            {stories.map(info => {
                                return <NewsItem key={info.id} info={info} />;
                            })}
                        </div>
                    </div>;
                })}
            </>
        }

        {/* 加载更多 */}
        <div className="load-more"
            ref={loadMoreBox}
            style={{
                display: newsList.length === 0 ? 'none' : 'block'
            }}>
            数据加载中
            <DotLoading />
        </div>
    </StyledDiv>;
};
export default Home;