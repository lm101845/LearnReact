import React ,{useContext}from 'react'
import {Button} from 'antd'
import * as TYPES from '../store/action-types'
import action from '../store/actions'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

const VoteFooter = (props) => {
   let {support,oppose} = props
    return <div className="footer">
        <Button type="primary" onClick={support}>支持</Button>
        <Button type="primary" danger onClick={oppose}>反对</Button>
    </div>;
}

//写法1：老语法
// export default connect(null,dispatch => {
//     return {
//         support(){
//             dispatch(action.vote.support())
//         },
//         oppose(){
//             dispatch(action.vote.oppose())
//         }
//     }
// })(VoteFooter)

//写法2：更简单(这也是为什么我们action中要写成函数了，而不是直接写成对象)
export default connect(null,action.vote)(VoteFooter)


