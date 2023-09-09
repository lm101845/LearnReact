/**
 * @Author liming
 * @Date 2023/9/7 11:17
 **/
import React, {useEffect, useMemo} from 'react'
import timg from '../assets/images/timg.jpg'
import './HomeHead.less'
import {connect} from 'react-redux'
import action from '../store/action'
import {useNavigate} from "react-router-dom";

const HomeHead = (props) => {
    // console.log(props,'HomeHead的props')
    const navigate = useNavigate()
    //计算时间中的月和日
    let {today,info,queryUserInfoAsync} = props  //useMemo 计算属性 变了才重新计算
    let time = useMemo(() => {
        let [,, month, day] = today.match(/^(\d{4})(\d{2})(\d{2})$/) ;
        // console.log(month,day)
        let area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return {
            month: area[+month] + '月',
            day
        };
    }, [today]);

    //第一次渲染完：如果info中没有信息，我们尝试派发一次，获取到登陆者信息
    useEffect(()=>{
        // console.log('useEffect函数执行了')
        if(!info){
            queryUserInfoAsync()
        }
    },[])
    return <header className="home-head-box">
        <div className="info">
            <div className="time">
                <span>{time.day}</span>
                <span>{time.month}</span>
            </div>
            <div className="title">知乎日报</div>
        </div>
        <div className="picture" onClick={()=>{
            navigate('/personal')
        }}>
            {/*<img src="../assets/images/timg.jpg" alt="头像"/>*/}
            {/*使用相对地址写图片地址是显示不出来的,打包后项目工程就变了*/}
            {/*但是在CSS样式中，是可以处理相对地址的，因为webpack打包的时候，会处理CSS中的图片导入*/}
            <img src={info ? info.pic : timg} alt="头像"/>
        </div>
    </header>
}

export default connect(state=>state.base,action.base)(HomeHead)
