import React, {Component} from 'react';
import {getRemoveFinishedItemAction, getIsCheckedAll, getAddItemAction} from './../store/actionCreators'
import {connect} from 'react-redux'

class Foot extends Component{
    constructor(props){
        super(props);
    }
    render() {
        const {finishedCount, todos, removeFinishedItem, isCheckedAll} = this.props;
        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={todos.length > 0 && finishedCount === todos.length}
                        onChange={()=>isCheckedAll(finishedCount !== todos.length)}
                    />
                </label>
                <span><span>已完成{finishedCount}件</span> / 总计{todos.length}件</span>
                <button
                    className="btn btn-warning"
                    onClick={()=>removeFinishedItem()}
                >
                    清除已完成任务
                </button>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        todos: state.todos,
        finishedCount:state.finishedCount
    }
};
const mapDispatchToProps = (dispatch)=>{
    return {
        removeFinishedItem(){
            const action = getRemoveFinishedItemAction();
            dispatch(action);
        },

        isCheckedAll(flag) {
            const action = getIsCheckedAll(flag);
            dispatch(action);
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Foot)