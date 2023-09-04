/**
 * @Author liming
 * @Date 2023/9/4 17:32
 **/
import React, {Suspense} from 'react'
//需要用Suspense包一下，因为按需加载是需要从服务器获取，需要时间的，所以要异步
import {HashRouter, Route, Switch, Redirect, Link} from "react-router-dom";

/*调用组件的时候，基于属性传递路由表进来，我们根据路由表，动态设定路由的匹配规则*/
const RouterView = (props) => {
    //获取传递的路由表
    let {routes} = props
    return <Switch>
        {/*循环设置路由匹配规则*/}
        {routes.map((item, index) => {
            let {redirect, from, to, exact, path, component: Component, name, meta} = item
            //component重命名为大写
            let config = {}
            if (redirect) {
                //重定向规则
                config = {to}  //to肯定有
                if (from) config.from = from
                if (exact) config.exact = true
                return <Redirect key={index} {...config}></Redirect>
            }
            //正常匹配规则
            config = {path}
            if (exact) config.exact = true
            return <Route key={index} {...config} render={() => {
                //统一基于RENDER函数处理，当某个路由匹配，后期在这里可以做一些其他事情
                return <Suspense fallback={<>正在处理中...</>}>
                    <Component/>
                </Suspense>
            }}></Route>
        })}
    </Switch>
}

export default RouterView
