/**
 * @Author liming
 * @Date 2023/9/6 23:04
 **/

import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useParams, useSearchParams, useLocation, useMatch, useNavigate } from 'react-router-dom';
import 'antd-mobile/es/global';
import {Toast, Mask, DotLoading} from 'antd-mobile';
import routes from "./routes";


/*统一路由配置*/
const Element = (props)=>{
    let {component:Component,meta} = props
    //修改页面的title
    let {title='知乎日报-WebApp'} = meta || {}
    //没有meta中title属性，则给一个默认值

    //获取路由信息,基于属性传递给组件
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [usp] = useSearchParams()
    return <Component navigate={navigate} location={location} params={params} usp={usp}/>
}


export default function RouterView(){
    return <Suspense fallback={<Mask visible={true}>
        <DotLoading color="white"></DotLoading>
    </Mask>}>
        <Routes>
            {routes.map((item,index)=>{
                let {name,path} = item
                return <Route key={name} path={path} element={<Element {...item}/>}></Route>
            })}
        </Routes>
    </Suspense>
}

