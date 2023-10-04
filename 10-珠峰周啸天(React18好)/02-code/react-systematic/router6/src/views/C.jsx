/**
 * @Author liming
 * @Date 2023/9/4 15:19
 **/
import React from 'react'
import {useLocation, useMatch,useSearchParams,useParams} from "react-router-dom";
import qs from 'qs'
const C = () => {
    console.log(useLocation(),'C组件useLocation')
    const location = useLocation()
    const usp = new URLSearchParams(location.search)
    console.log(usp.get('id'),usp.get('name'))

    // console.log(useSearchParams())
    let [usp1] = useSearchParams()  //返回一个数组
    console.log(usp1.get('id'),usp1.get('name'))

    let match = useMatch(location.pathname)   //useMatch必须要传递一个地址
    console.log(match,'match')

    const params = useParams()
    console.log(params,'params');

    console.log(location.state,'state不会消失！！！')
    return <div className="box">
        C组件的内容
    </div>
}

export default C
