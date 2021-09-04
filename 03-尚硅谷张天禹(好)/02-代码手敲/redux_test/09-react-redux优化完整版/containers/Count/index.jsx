import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createIncrementAction} from '../../redux/count_action'
//Count是UI
class Count extends Component {
    add = () => {
        //通过redux加1
        // 如何通知：通过父亲给你传的操作的方法
        this.props.jiafa(5)
    }
    render() {
        return (
            <div>
                <h2>当前求和为{this.props.he}</h2>
               <button onClick={this.add}>点我加5</button>
            </div>
        )
    }
}

//connect是容器
export default connect(
    //映射状态
    state => ({ he: state }),
    //映射操作状态的方法
    {
        jiafa: createIncrementAction
    }
)(Count)
