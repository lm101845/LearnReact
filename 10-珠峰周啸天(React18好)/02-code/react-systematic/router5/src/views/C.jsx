/**
 * @Author liming
 * @Date 2023/9/4 15:19
 **/
import React from 'react'
import {useLocation, useParams, useRouteMatch} from "react-router-dom";
import qs from 'qs'
const C = () => {
    const location = useLocation()
    console.log(location,'C组件Location')   //?id=100&name=zsf
    // console.log(props,'C组件props')

    //获取传递的问号参数信息方式1：
    // let query = qs.parse(location.search.substring(1))
    // console.log(query,'C组件query')

    //获取传递的问号参数信息方式2：
    // let usp = new URLSearchParams(location.search)
    // console.log(usp.get('id'),usp.get('name'),'方式2')

    //路径传参获取方式1：
    const match = useRouteMatch()
    console.log(match.params,'params')

    //路径传参获取方式2：
    let params = useParams()
    console.log(params,'params22')

    //获取隐式传参信息
    console.log(location.state,'state隐式传参')
    return <div className="box">
        C组件的内容
    </div>
}

export default C
