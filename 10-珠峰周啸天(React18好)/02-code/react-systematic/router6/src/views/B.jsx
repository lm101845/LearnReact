/**
 * @Author liming
 * @Date 2023/9/4 15:19
 **/
import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import qs from 'qs'
const B = (props) => {
    console.log(props,'B组件props')
    console.log(useLocation(), 'B组件useLocation')
    const navigate = useNavigate()
    // nagivate('./c')
    // nagivate('./c',{replace:true})
    const handle = () => {
        //问号传参
        // navigate({
        //     pathname:'/c',
        //     search:qs.stringify({
        //         id:100,
        //         name:'zf'
        //     })
        // })

        // navigate('/c/100/zhufeng');

        //隐式传参(v6中刷新，信息还在！！)
        navigate('/c', {
            state: {
                replace: true,  //替换掉现有地址
                state: {
                    id: 100,
                    name: 'zf'
                }
            }
        })
    }
    return <div className="box">
        B组件的内容
        <button onClick={handle}>按钮</button>
    </div>
}

export default B
