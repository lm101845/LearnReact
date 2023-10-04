/**
 * @Author liming
 * @Date 2023/9/13 16:15
 **/
const routes = [
    {
        path:'/',
        component:'index',
        title:'首页'
        //自动回去pages目录下进行查找,也可以自己指定详细目录
        // component:'@/pages/index'
    },
    {
        path:'/demo/:id',
        component: '@/pages/demo',
        title:'测试页'
    },
    {
        path:'/personal',
        component: 'personal',
        title:'个人中心',
        routes:[
            {
                path:'/personal',
                redirect:'/personal/order',
                title:'订单页'
            },
            {
                path:'/personal/order',
                component:'personal/order',
                title:'订单页'
            },
            {
                path:'/personal/profile',
                component:'personal/profile',
                title:'个人信息页'
            },
        ]
    },
    {
        path:'*',
        component: '404',
        title:'404'
    }
]

export default routes
