/**
 * @Author liming
 * @Date 2023/9/4 17:33
 **/

/**配置路由表:数组。数组中的每一项就是每一个需要配置的路由规则(规则是我们自己制定的)
 *  +redirect:true 此配置是重定向
 *  +from
 *  +to
 *  +exact
 *  +path
 *  +component:要渲染的组件
 *  +name：路由名称(命名路由)
 *  +meta:路由元信息[包含当前路由的一些信息，当路由匹配后，我们可以拿这些信息做一些事情...]
 *  +children:[] 子路由
 * */
import A from '../views/A'
import B from '../views/B'
import C from '../views/C'
import aRoutes from './aRoutes'

//一级路由的路由表
const routes = [
    {
        redirect:true,
        from:'/',
        to:'/a',
        exact:true
    },
    {
        path:'/a',
        name:'a',
        component: A,
        meta:{},
        children:aRoutes
    },
    {
        path:'/b',
        name:'b',
        component: B,
        meta:{},
    },
    {
        path:'/c',
        name:'c',
        component: C,
        meta:{},
    },
    {
        redirect: true,
        to:'/a'
    }
]
export default routes
