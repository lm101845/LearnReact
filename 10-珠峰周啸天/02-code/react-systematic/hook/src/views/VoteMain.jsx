import React,{useMemo} from 'react'
import PropTypes from 'prop-types'

const VoteMain = props => {
    let {supNum, oppNum} = props
    //useMemo是一个React钩子，用来记忆函数的输出。
    let ratio = useMemo(()=>{
        let ratio = '--', total = supNum + oppNum
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
        return ratio
    },[supNum,oppNum])
    //属性规则校验
    VoteMain.defaultProps = {
        supNum: 0,
        oppNum: 0
    }

    VoteMain.propTypes = {
        supNum: PropTypes.number,
        oppNum: PropTypes.number
    }

    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        <p>支持比率：{ratio}</p>
    </div>;
}

export default VoteMain
