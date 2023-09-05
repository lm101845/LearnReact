/**
 * @Author liming
 * @Date 2023/9/4 15:19
 **/
import React from 'react'
import {useHistory,useLocation,useRouteMatch} from "react-router-dom";
import qs from 'qs'
const B = (props) => {
    let history = useHistory()
    let location = useLocation()
    let match = useRouteMatch()

    // console.log('history====》',history,location,match)
    // console.log(props,'B组件props')

    return <div className="box">
        B组件的内容
        <button onClick={()=>{
            /**
             * 传参方式1：问号传参
             *  +不建议这么写，丑且有长度限制
             *  +信息是显式的，即使再目标路由内刷新，传递的信息也在
             *
             *  传参方式2：路径参数
             *   +把需要传递的值，作为路径中的一部分
             *   +传递的信息也在URL中：比问号传参看起来漂亮一些，但是也存在安全和长度限制
             *   +因为信息都在地址中，即使在目标组件中刷新，传递的信息也在
             *
             *   传参方式3：隐式传参
             *     +传递的信息不回出现在地址中，安全，美观，也没有限制
             *     +在目标组件内刷新，传递的信息就丢失了
             * */

            //1:
            // history.push('/c')
            // history.push('/c?id=1&name=zs')
            // history.push({
            //     pathname:'/c',
            //     // search:'id=1&name=zs'
            //     // search:'id=1&name=zs'
            //     //search存储的就是问号传参信息,要求是urlencoded字符串
            //     search:qs.stringify({
            //         id:100,
            //         name:'zsf'
            //     })
            // })

            //2:
            // history.push('/c/100/lisi')

            //3:
            history.push({
                pathname:'/c',
                state:{
                    id:100,
                    name:'lili'
                }
            })
        }
        }>按钮</button>
    </div>
}

export default B
