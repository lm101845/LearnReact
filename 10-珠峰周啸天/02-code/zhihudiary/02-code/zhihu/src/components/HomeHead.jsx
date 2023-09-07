/**
 * @Author liming
 * @Date 2023/9/7 11:17
 **/
import React,{useMemo} from 'react'
import timg from '../assets/images/timg.jpg'
import './HomeHead.less'
const HomeHead = (props) => {
    //计算时间中的月和日
    let {today} = props  //useMemo 计算属性 变了才重新计算
    let time = useMemo(() => {
        let [,, month, day] = today.match(/^(\d{4})(\d{2})(\d{2})$/) ;
        // console.log(month,day)
        let area = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
        return {
            month: area[+month] + '月',
            day
        };
    }, [today]);

    return <header className="home-head-box">
        <div className="info">
            <div className="time">
                <span>{time.day}</span>
                <span>{time.month}</span>
            </div>
            <div className="title">知乎日报</div>
        </div>
        <div className="picture">
            {/*<img src="../assets/images/timg.jpg" alt="头像"/>*/}
            {/*使用相对地址写图片地址是显示不出来的,打包后项目工程就变了*/}
            {/*但是在CSS样式中，是可以处理相对地址的，因为webpack打包的时候，会处理CSS中的图片导入*/}
            <img src={timg} alt="头像"/>
        </div>
    </header>
}

export default HomeHead
