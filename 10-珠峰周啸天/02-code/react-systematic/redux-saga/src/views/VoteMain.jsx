import React from 'react'

import {connect} from 'react-redux'
class VoteMain extends React.Component{
    render() {
        let {supNum,oppNum} = this.props
        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>;
    }
}



export default connect(state=>state.vote)(VoteMain)
