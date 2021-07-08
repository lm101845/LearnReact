import React, {Component} from 'react';
import store from './../store';
import {getRemoveFinishedItemAction, getIsCheckedAll} from './../store/actionCreators'

export default class Foot extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();

        // 订阅store的改变
        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);


    }
    render() {
        const {finishedCount, todos} = this.state;
        return (
            <div className="todo-footer">
                <label>
                    <input
                        type="checkbox"
                        checked={todos.length > 0 && finishedCount === todos.length}
                        onChange={()=>this._dealChecked(finishedCount !== todos.length)}
                    />
                </label>
                <span><span>已完成{finishedCount}件</span> / 总计{todos.length}件</span>
                <button
                    className="btn btn-warning"
                    onClick={()=>this._dealClick()}
                >
                    清除已完成任务
                </button>
            </div>
        )
    }

    _dealClick(){
        const action = getRemoveFinishedItemAction();
        store.dispatch(action);
    }

    _dealChecked(flag){
        const action = getIsCheckedAll(flag);
        store.dispatch(action);
    }

    _handleStoreChange(){
        // 更新状态
        this.setState(store.getState())
    }
}