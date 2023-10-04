/**
 * @Author liming
 * @Date 2023/9/13 16:04
 **/
import React from 'react'
import {useNavigate,history} from "umi";
import {Button} from "antd";

const OrderPage = () => {
    const navigate = useNavigate()
    const handle = ()=>{
        // navigate({
        //     pathname:'/personal/profile',
        //     search:'lx=0&name=zhufeng'
        //     //在我们开启了historyWithQuery配置项之后，就可以使用query对象进行传递了
        // })

        // history.push({
        //     pathname:'/personal/profile',
        //     query:{
        //         lx:'xxx',
        //         name:'zhangsan'
        //     }
        // })

        //使用state隐式传参
        navigate('/personal/profile',{
            state:{
                a:1,
                b:2
            }
        })
    }
    return (
        <div>
            <h2>我的订单</h2>
            <Button type="primary" onClick={handle}>按钮</Button>
        </div>
    );
};

export default OrderPage;
