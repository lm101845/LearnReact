/**
 * @Author liming
 * @Date 2023/9/6 22:15
 **/
import React, {useState, useEffect} from 'react'
import './Detail.less'
import {LeftOutline, LikeOutline, MessageOutline, MoreOutline, StarOutline,} from "antd-mobile-icons";
import {Badge} from 'antd-mobile'
import API from '../api'
import SkeletonAgain from "../components/SkeletonAgain";
import {flushSync} from "react-dom";

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
                <span className="stored"><StarOutline/></span>
                <span><MoreOutline/></span>
            </div>
        </div>
    </div>
}

export default Detail
