import React from 'react'
import {Button} from 'antd'
import PropTypes from "prop-types";

// class VoteFooter extends React.Component {
class VoteFooter extends React.PureComponent {
    //属性规则校验
    static defaultProps = {}

    static propTypes = {
        change: PropTypes.func.isRequired
    }
    render() {
        console.log('Footer Render')
        //父组件传的change方法，一直没有变化，我们不用每次都更新子组件，所以继承PureComponent即可
        let {change} = this.props
        return <div className="footer">
            <Button onClick={change.bind(null,'sup')}>支持</Button>
            <Button onClick={change.bind(null,'opp')}>反对</Button>
        </div>;
    }
}

export default VoteFooter


