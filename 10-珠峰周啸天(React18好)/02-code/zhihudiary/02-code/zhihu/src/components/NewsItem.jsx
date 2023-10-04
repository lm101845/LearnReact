/**
 * @Author liming
 * @Date 2023/9/7 11:19
 **/
import React from 'react'
import './NewsItem.less'
import {Image} from 'antd-mobile'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
const NewsItem = (props) => {
    let {info} = props
    if(!info) return null
    let {id,title,hint,images,image} = info
    //let { info: { id, title, hint, images } } = props; 简写，但是中间有判断，所以不能简写
    if(!images) images = [image]
    if(!Array.isArray(images)) images = ['']
    return <div className="news-item-box">
        <Link to={{pathname:`/detail/${id}`}}>
            <div className="content">
                <div className="title">{title}</div>
                <div className="author">{hint}</div>
            </div>
            <Image src={images[0]} lazy></Image>
        </Link>
    </div>
}

/*属性规则处理:这个组件别人也要调，别人不清楚要传什么值，所以要做规则校验*/
NewsItem.defaultProps = {
    info:null
}
NewsItem.propTypes = {
    info:PropTypes.object
}
export default NewsItem
