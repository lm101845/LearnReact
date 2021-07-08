import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Foot extends Component{
    static propTypes = {
        finishedCount: PropTypes.number.isRequired, // 已经完成的任务数量
        totalCount: PropTypes.number.isRequired,   // 总任务数量
        delCheckedTodo: PropTypes.func.isRequired, // 删除已经完成的所有任务
        dealSelectedAllTodo: PropTypes.func.isRequired // 选中/取消所有
    };
    render() {
        const {finishedCount, totalCount, delCheckedTodo, dealSelectedAllTodo} = this.props;
        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={finishedCount === totalCount}
                        onChange={()=>dealSelectedAllTodo(finishedCount !== totalCount)}
                    />
                </label>
                <span><span>已完成{finishedCount}件</span> / 总计{totalCount}件</span>
                <button
                    className="btn btn-warning"
                    onClick={()=>delCheckedTodo()}
                >
                    清除已完成任务
                </button>
            </div>
        )
    }
}