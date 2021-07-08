import React, {Component} from 'react';
import PropTypes from "prop-types";
export default class Foot extends Component {
    static propTypes ={
        finishedCount: PropTypes.number.isRequired, // 已经完成任务数量
        totalCount: PropTypes.number.isRequired,  // 总任务数
        delCheckedTodo: PropTypes.func.isRequired // 删除已经完成的任务
    };

    render(){
        const {finishedCount, totalCount} = this.props;
        return (
            <div className="todo-footer">
                <span><span>已完成{finishedCount}件</span> / 总计{totalCount}件</span>
                <button className="btn btn-warning" onClick={()=>this.props.delCheckedTodo()}>清除已完成任务</button>
            </div>
        )
    }
}