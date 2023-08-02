import React ,{useContext}from 'react'
import ThemeContext from '../ThemeContext'
import {Button} from 'antd'

const VoteFooter = () => {
    const {store} = useContext(ThemeContext)
    console.log(store,'VoteFooter上下文中的store')
    //voteFooter中，不需要用到状态信息
    return <div className="footer">
        <Button type="primary" onClick={()=>{
            store.dispatch({
                type:'VOTE_SUP'
            })
        }}>支持</Button>
        <Button type="primary" danger onClick={()=>{
            store.dispatch({
                type:'VOTE_OPP'
            })
        }}>反对</Button>
    </div>;
}

export default VoteFooter


