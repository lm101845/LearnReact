/**
 * @Author liming
 * @Date 2023/9/7 11:19
 **/
import React from 'react'
import './NewsItem.less'
import {Image} from 'antd-mobile'
import {Link} from 'react-router-dom'
const NewsItem = () => {
    return <div className="news-item-box">
        <Link to={{pathname:`/detail/xx`}}>
            <div className="content">
                <div className="title">斑马的条纹是干什么的？</div>
                <div className="author">作者 苏轼</div>
            </div>
            <Image src="https://picx.zhimg.com/v2-263e6451fe32ed8d9512eab97de4a2be.jpg?source=8673f162" lazy></Image>
        </Link>
    </div>
}

export default NewsItem
