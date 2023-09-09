/**
 * @Author liming
 * @Date 2023/9/6 22:15
 **/
import React, {useState, useEffect, useMemo} from 'react'
import './Detail.less'
import {LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline,} from "antd-mobile-icons";
import {Badge, Toast} from 'antd-mobile'
import API from '../api'
import SkeletonAgain from "../components/SkeletonAgain";
import {flushSync} from "react-dom";
import {connect} from 'react-redux'
import action from '../store/action'

const Detail = (props) => {
    console.log(props, 'navigate的props')
    let {navigate, params} = props
    /*定义状态*/
    let [info, setInfo] = useState(null)
    let [extra, setExtra] = useState(null)

    /*第一次渲染完毕：获取数据(2个接口请求无前后关系，并行)*/
    let link;
    const handleStyle = (result) => {
        // console.log(result,'handleStyle-result')
        let {css} = result
        if (!Array.isArray(css)) return
        css = css[0]
        if (!css) return;
        link = document.createElement('link')
        link.rel = 'stylesheet'   //这个属性必须加，不加就不是css了
        link.href = css
        document.head.appendChild(link)
    }

    const handleImage = (result) => {
        console.log(result, 'handleImage-result')
        //视图渲染完之后，才能拿到这个DOM元素
        let imgPlaceHolder = document.querySelector('.img-place-holder')
        if(!imgPlaceHolder) return
        //创建大图，并插入到容器当中
        let tempImg = new Image
        tempImg.src = result.image
        tempImg.onload = ()=>{
            imgPlaceHolder.appendChild(tempImg)
        }
        //如果图片加载失败，把上面的图片移除掉
        tempImg.onerror = ()=>{
            let parent = imgPlaceHolder.parentNode
            parent.parentNode.removeChild(parent)
        }
    }

    // useEffect(()=>{
    //     handleStyle()
    //     handleImage()
    // },[info])

    useEffect(() => {
        (async () => {
            try {
                let result = await API.queryNewsInfo(params.id)
                // flushSync(()=>{
                //     setInfo(result)
                // })
                flushSync(()=>{
                    setInfo(result)
                    //这样不好，就变成串行了。解决方法：useEffect写2行
                    // result = await API.queryNewsExtra(params.id)
                    // setExtra(result)

                    //处理样式
                    //setInfo状态更改，从18开始时异步的,所以这里是拿不到的
                    //方法①我们通过形参拿过来即可
                    handleStyle(result)
                })
                //只有flushSync处理完后，下面的handleImage才会执行，此时DOM肯定有了
                handleImage(result)

                //错误方法②：flushSync(但是拿的还是第一个闭包拿到的东西),所以要用useEffect
                //方法③：用useEffect
            } catch (_) {
            }
        })()
        //销毁组件：移除创建的样式(防止引入的样式对我写的其他样式产生影响)
        return () => {
            if (link) {
                document.head.removeChild(link)
            }
        }
    }, [])

    useEffect(() => {
        (async () => {
            try {
                let result = await API.queryNewsExtra(params.id)
                setExtra(result)
            } catch (_) {
            }
        })()
    }, [])

    //=========下面的逻辑是关于登录和收藏的==============
    let
        {
            base: {info: userInfo}, queryUserInfoAsync,
            location,
            store: {list: storeList}, queryStoreListAsync, removeStoreListById
        } = props
    useEffect(() => {
        (async () => {
            // console.log(userInfo, '打印userInfo')
            //第一次渲染完：如果userInfo不存在，我们派发任务同步登陆者信息
            if (!userInfo) {
                // console.log('第一次渲染完')
                let {info} = await queryUserInfoAsync()
                userInfo = info
            }
            //如果已经登录  && 没有收藏列表信息
            if(userInfo && !storeList){
                queryStoreListAsync()
            }
        })()
    }, [])

    //依赖于收藏列表和路径参数，计算出是否收藏
    const isStore = useMemo(()=>{
        if(!storeList) return false
        return storeList.some(item=>{
            return +item.news.id === +params.id
        })
    },[storeList,params])

    //点击收藏按钮
    const handleStore = async () => {
        //先判断是否登录
        if (!userInfo) {
            Toast.show({
                icon: 'fail',
                content: '请先登录'
            })
            navigate(`/login?to=${location.pathname}`, {replace: true})
            return
        }

        //已经登录：收藏或者移除收藏
        if(isStore){
            //移除收藏
            let item = storeList.find(item=>{
                return +item.news.id === +params.id
            })
            if(!item) return
            let {code} = await API.storeRemove(params.id)
            if(+code !== 0){
                Toast.show({
                    icon:'fail',
                    content:'操作失败'
                })
                return
            }
            Toast.show({
                icon:'success',
                content:'操作成功'
            })
            removeStoreListById(item.id)  //告诉redux也把这项移除掉
            return;
        }
        //收藏
        try{
            let {code} = await API.store(params.id)
            if(+code !== 0){
                Toast.show({
                    icon:'fail',
                    content:'收藏失败'
                })
                return
            }
            Toast.show({
                icon:'success',
                content:'收藏成功'
            })
            //同步最新的收藏列表到redux中
            queryStoreListAsync()
        }catch (_){}
    }
    return <div className="detail-box">
        {/*新闻内容*/}
        {!info ? <SkeletonAgain/> :
            <div className="content" dangerouslySetInnerHTML={{
                __html: info.body
            }}></div>
        }

        {/*底部图标*/}
        <div className="tab-bar">
            <div className="back" onClick={() => {
                navigate(-1)
            }}><LeftOutline/></div>
            <div className="icons">
                <Badge content={extra ? extra.comments : 0}><MessageOutline/></Badge>
                <Badge content={extra ? extra.popularity : 0}><LikeOutline/></Badge>
                <span className={isStore ? 'stored':''} onClick={handleStore}><StarOutline/></span>
                <span><MoreOutline/></span>
            </div>
        </div>
    </div>
}

export default connect(state => {
    return {
        base: state.base,
        store: state.store
    }
}, {...action.base, ...action.store})(Detail)
// export default connect(state=>state,action)(Detail)  //把redux中所有版块信息都传过来了
