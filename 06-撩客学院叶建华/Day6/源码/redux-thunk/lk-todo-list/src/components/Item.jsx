import React, {Component} from 'react';
import PropTypes from 'prop-types';

import store from './../store';
import {getDelItemAction, getChangeItemFinishedAction} from './../store/actionCreators'

export default class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDelBtn: false
        }
    }
    static propTypes = {
        todo: PropTypes.object.isRequired, // 单条数据
    };
    render() {
        const {todo} = this.props;
        const {showDelBtn} = this.state;
        return (
            <li
               onMouseOver={()=>this._hasShowBtn(true)}
               onMouseOut={()=>this._hasShowBtn(false)}
            >
                <label>
                    <input
                        type="checkbox"
                        checked={todo.finished}
                        onChange={()=>this._dealChange(todo.id, !todo.finished)}/>
                    <span>{todo.title}</span>
                </label>
                <button
                    className="btn btn-warning"
                    style={{display: showDelBtn ? 'block' : 'none'}}
                    onClick={()=>this._dealRemove(todo.id)}
                >
                    删除
                </button>
            </li>
        )
    }

    // 处理按钮的显示和隐藏
    _hasShowBtn(flag){
        this.setState({
            showDelBtn: flag
        })
    }

    _dealRemove(todoId){
         const action = getDelItemAction(todoId);
         store.dispatch(action);
    }

    _dealChange(todoId, flag){
        const action = getChangeItemFinishedAction(todoId, flag);
        store.dispatch(action);
    }
}