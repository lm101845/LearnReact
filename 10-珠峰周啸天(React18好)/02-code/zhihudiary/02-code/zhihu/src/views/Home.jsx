/**
 * @Author liming
 * @Date 2023/9/6 22:15
 **/
import React, {useEffect, useState,useRef} from 'react'
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
    let [newsList, setNewsList] = useState([])

    let loadMore = useRef()
    //第一次渲染完毕，向服务器发送请求
    useEffect(() => {
        //async本身不能加async,所以要用自执行函数包一下
        (async () => {
            try {
                let {date, stories, top_stories} = await API.queryNewsLatest()
                // console.log('RENDER')
                setToday(date)
                setBannerData(top_stories)
                //在原来新闻列表基础上往上加
                newsList.push({
                    date, stories
                })
                //更新新闻列表状态
                //useState有优化机制，只要内存地址一样，视图就不会修改,所以如下写法不行
                // setNewsList(newsList)
                setNewsList([...newsList])
                // console.log(newsList,'newsList')
            } catch (_) {
            }
        })()
    }, [])

    //第一次渲染完毕：设置监听器，实现触底加载
    useEffect(()=>{
        // console.log('useEffect-第一次设置监听器')
        // console.log(loadMore.current,'loadMore')
        //设置监听器
        /**
         * 当一个 IntersectionObserver 对象被创建时，其被配置为监听根中一段给定比例的可见区域。
         * 一旦 IntersectionObserver 被创建，则无法更改其配置，
         * 所以一个给定的观察者对象只能用来监听可见区域的特定变化值；
         * 然而，你可以在同一个观察者对象中配置监听多个目标元素。
         * */
        let ob = new IntersectionObserver(async changes=>{
            let {isIntersecting} = changes[0]
            if(isIntersecting){
                //加载更多的按钮出现在视图中[也就是触底了]
                try{
                    let time = newsList[newsList.length - 1]['date']
                    let res = await API.queryNewsBefore(time)
                    newsList.push(res)
                    setNewsList([...newsList])
                }catch (_){}
            }
        })
        let loadMoreBox = loadMore.current
        ob.observe(loadMore.current)
        //组件释放了，监听器就没有用了，要手动移除[只有合成事件不需要我们手动移除]
        return ()=>{
            //这个函数会在组件释放的时候执行
            // console.log(loadMore.current,'组件释放')  //变成null了，所以用另一个变量来移除
            // ob.unobserve(loadMore.current)
            // console.log(loadMoreBox,'loadMoreBox')   //正常
            ob.unobserve(loadMoreBox)
            ob = null
        }
    },[])

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
        {/*每一个new-box都代表一天的新闻，我们循环这个盒子*/}
        {newsList.length === 0 ? <SkeletonAgain/> :
            <>
                {
                    newsList.map((item,index) => {
                        let {date,stories} = item
                        return <div className="new-box" key={date}>
                            {index !== 0 ? <Divider contentPosition="left">{_.formatTime(date,'{1}月{2}日')}</Divider> :null}
                            <div className="list">
                                {stories.map(story=>{
                                    return <NewsItem key={story.id} info={story}/>
                                })}
                            </div>
                        </div>
                    })
                }
            </>
        }
        {/*滚动到底部加载更多*/}
        <div className="loadmore-box" ref={loadMore} style={{
            display: newsList.length === 0 ? 'none' :'block'
        }}>
            <DotLoading/>
            数据加载中
        </div>
    </div>
}

export default Home
