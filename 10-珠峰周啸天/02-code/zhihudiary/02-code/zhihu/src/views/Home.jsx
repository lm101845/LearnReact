/**
 * @Author liming
 * @Date 2023/9/6 22:15
 **/
import React, {useEffect, useState} from 'react'
import HomeHead from '../components/HomeHead'
import _ from '../assets/utils'
import './Home.less'
import {Swiper, Image,Divider,DotLoading} from 'antd-mobile'
import {Link} from 'react-router-dom'
import API from '../api'
import NewsItem from '../components/NewsItem'
import SkeletonAgain from '../components/SkeletonAgain'
const Home = () => {
    /*创建所需状态*/
    let [today, setToday] = useState(_.formatTime(null, '{0}{1}{2}'))
    let [bannerData, setBannerData] = useState([])

    //第一次渲染完毕，向服务器发送请求
    useEffect(() => {
        //async本身不能加async,所以要用自执行函数包一下
        (async () => {
            try {
                let {date, stories, top_stories} = await API.queryNewsLatest()
                setToday(date)
                setBannerData(top_stories)
            } catch (_) {
            }
        })()
    }, [])
    return <div className="home-box">
        <HomeHead today={today}/>
        {/*轮播图*/}
        <div className="swiper-box">
            {bannerData.length > 0 ? <Swiper autoplay={false} loop={true}>
                {bannerData.map(item => {
                    let {id, image, title, hint} = item
                    return <Swiper.Item key={id}>
                        <Link to={{pathname: `/detail/${id}`}}>
                            {/*<img src={image} alt=""/>*/}
                            <Image src={image} lazy/>
                            {/*实现图片懒加载*/}
                            <div className="desc">
                                <h3 className="title">{title}</h3>
                                <p className="author">{hint}</p>
                            </div>
                        </Link>
                    </Swiper.Item>
                })}
            </Swiper> : null}

        </div>
        {/*新闻列表*/}
        {/*没有数据之前，我们先展示骨架屏*/}
        <SkeletonAgain></SkeletonAgain>
        {/*每一个new-box都代表一天的新闻，我们循环这个盒子*/}
        <div className="new-box">
            <Divider contentPosition="left">12月23日</Divider>
            <div className="list">
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
            </div>
        </div>
        <div className="new-box">
            <Divider contentPosition="left">12月23日</Divider>
            <div className="list">
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
                <NewsItem/>
            </div>
        </div>
        {/*滚动到底部加载更多*/}
        <div className="loadmore-box">
            <DotLoading/>
            数据加载中
        </div>
    </div>
}

export default Home
