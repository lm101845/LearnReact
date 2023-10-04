/**
 * @Author liming
 * @Date 2023/9/6 23:04
 **/

import {Suspense, useEffect, useState} from 'react';
import {
    Routes,
    Route,
    useParams,
    useSearchParams,
    useLocation,
    useMatch,
    useNavigate,
    Navigate
} from 'react-router-dom';
import {Toast, Mask, DotLoading} from 'antd-mobile';
import routes from "./routes";
import store from '../store'
import action from '../store/action'
import * as PropTypes from "prop-types";

/*统一路由配置*/
const isCheckLogin = (path) => {
    let {base: {info}} = store.getState()
    let checkList = ['/personal', '/store', '/update']
    return !info && checkList.includes(path)
}

const Element = (props) => {
    // console.log(props,'Element的props')
    let {component: Component, meta, path} = props
    let isShow = !isCheckLogin(path)
    //isShow:要渲染我的组件还是做异步校验(此时先返回一个Loading效果)

    let [_,setRandom] = useState(0)
    //保存为状态，只有第一次才会执行，不行
    // let [isShow, setIsShow] = useState(()=>{
    //     return !isCheckLogin(path)
    // })

    //登录态校验
    // let {base: {info}} = store.getState()
    // let checkList = ['/personal', '/store', '/update']
    // if (!info && checkList.includes(path)) {
    //     //如果info值不存在(第1次机会)，并且跳转的地址是三个中的一个：从服务器获取登录信息
    //     //props不能用async包，不然返回的组件就是Promise实例了，所以我们这里单独用自执行函数包
    //     (async () => {
    //         let infoAction = await action.base.queryUserInfoAsync()
    //         //这个肯定是异步的，我们需要等这个异步执行完，才能知道是return还是继续渲染这个组件
    //         info = infoAction.info
    //         //如果从服务器获取后还不存在(第2次机会)，则说明没有登录
    //         Toast.show({
    //             icon: 'fail',
    //             content: '请先登录'
    //         })
    //         if (!info) {
    //             return <Navigate to={{
    //                 pathname: '/login',
    //                 search: `?to=${path}`
    //             }}></Navigate>
    //         }
    //         //如果获取到了信息，说明的登录的，我们派发任务把信息存储到容器中
    //         store.dispatch(infoAction)
    //     })()
    // }
    useEffect(() => {
        if (isShow) return
        (async () => {
            let infoAction = await action.base.queryUserInfoAsync()
            //这个肯定是异步的，我们需要等这个异步执行完，才能知道是return还是继续渲染这个组件
            let info = infoAction.info
            //如果从服务器获取后还不存在(第2次机会)，则说明没有登录
            if (!info) {
                Toast.show({
                    icon: 'fail',
                    content: '请先登录'
                })
                // return <Navigate to={{
                //     pathname: '/login',
                //     search: `?to=${path}`
                // }}></Navigate>
                navigate({
                    pathname: '/login',
                    search: `?to=${path}`
                },{replace:true})
                return
                //跳转到登录页
            }
            //如果获取到了信息，说明的登录的，我们派发任务把信息存储到容器中
            store.dispatch(infoAction)
            setRandom(+new Date())   //执行这个方法可以让组件更新
        })()
    })

    // 修改页面的标题
    let title = meta?.title; // -> meta&&meta.title
    document.title = title ? `${title}-知乎日报` : `知乎日报`;
    //没有meta中title属性，则给一个默认值

    //获取路由信息,基于属性传递给组件
    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()
    const [usp] = useSearchParams()
    return <>
        {isShow ?
            <Component navigate={navigate} location={location} params={params} usp={usp}/>
            : <Mask visible={true}><DotLoading color="white"></DotLoading></Mask>}
    </>
}


export default function RouterView() {
    return <Suspense fallback={<Mask visible={true}><DotLoading color="white"></DotLoading></Mask>}>
        <Routes>
            {routes.map((item, index) => {
                let {name, path} = item
                return <Route key={name} path={path} element={<Element {...item}/>}></Route>
            })}
        </Routes>
    </Suspense>
}

