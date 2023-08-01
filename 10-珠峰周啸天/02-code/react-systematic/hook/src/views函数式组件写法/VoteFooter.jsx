import React ,{memo}from 'react'
//memo方法可以对每次传过来的方法做一个比较，如果一模一样，就不让函数组件再次更新了
import {Button} from 'antd'
import PropTypes from "prop-types";

// class VoteFooter extends React.Component {
const VoteFooter = props => {
    console.log('VoteFooter render')
    let {change} = props
    //属性规则校验
    VoteFooter.defaultProps = {}

    VoteFooter.propTypes = {
        change: PropTypes.func.isRequired
    }


    return <div className="footer">
        <Button onClick={change.bind(null, 'sup')}>支持</Button>
        <Button onClick={change.bind(null, 'opp')}>反对</Button>
    </div>;
}

export default memo(VoteFooter)


