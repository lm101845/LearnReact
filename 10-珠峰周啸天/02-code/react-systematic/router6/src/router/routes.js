/**
 * @Author liming
 * @Date 2023/9/6 14:50
 **/
import {Navigate} from 'react-router-dom'
import A from '../views/A'
import {lazy} from "react";

//A板块二级路由
const aRoutes = [
    {
        path:'/a',
        component:()=><Navigate to="/a/a1"/>,

    },
    {
        path:'/a/a1',
        name:'a-a1',
        component:lazy(/*webpackChunkName:'AChild*/()=>import('../views/a/A1'))
    },
    {
        path:'/a/a2',
        name:'a-a2',
        component:lazy(/*webpackChunkName:'AChild*/()=>import('../views/a/A2'))
    },
    {
        path:'/a/a3',
        name:'a-a3',
        component:lazy(/*webpackChunkName:'AChild*/()=>import('../views/a/A3'))
    },
]

//一级路由(导出这个，因为一级包含二级)
const routes = [
    {
        path: '/',
        component: () => <Navigate to="/a"/>
        //不拿函数包起来的话，则就会直接进行路由匹配了
    },
    {
        path: '/a',
        name: 'a',
        // component:<A/>    //不能这样写，这样写就会直接调用了
        component: A,
        meta: {},
        children: aRoutes
    },
    {
        path: '/b',
        name: 'b',
        component: lazy(() => import('../views/B'))
    },
    {
        path: '/c/:id/:name',
        name: 'c',
        component: lazy(() => import('../views/C'))
    },
    {
        path: '*',
        component: () => {
            return <Navigate to={{
                pathname: '/a',
                search: '?from=404'
            }}/>
        }
    }

]

export default routes
