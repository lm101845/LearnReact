import React ,{useContext}from 'react'
import ThemeContext from '../ThemeContext'
import {Button} from 'antd'
import * as TYPES from '../store/action-types'
import action from '../store/actions'
const VoteFooter = () => {
    const {store} = useContext(ThemeContext)
    console.log(store,'VoteFooter上下文中的store')
    //voteFooter中，不需要用到状态信息
    return <div className="footer">
        <Button type="primary" onClick={()=>{
            // store.dispatch({
            //     type: TYPES.VOTE_SUP
            // })
            store.dispatch(action.vote.support())
        }}>支持</Button>
        <Button type="primary" danger onClick={()=>{
            // store.dispatch({
            //     type: TYPES.VOTE_OPP
            // })
            store.dispatch(action.vote.oppose())
        }}>反对</Button>
    </div>;
}

export default VoteFooter


