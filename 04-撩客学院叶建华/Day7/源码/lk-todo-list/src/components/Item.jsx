import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getDelItemAction, getChangeItemFinishedAction} from './../store/actionCreators'
import connect from "react-redux/es/connect/connect";

class Item extends Component{
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
        const {todo, removeTodo, changeChecked} = this.props;
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
                        onChange={()=>changeChecked(todo.id, !todo.finished)}/>
                    <span>{todo.title}</span>
                </label>
                <button
                    className="btn btn-warning"
                    style={{display: showDelBtn ? 'block' : 'none'}}
                    onClick={()=>removeTodo(todo.id)}
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
}
const mapDispatchToProps = (dispatch)=>{
    return {
        removeTodo(todoId){
            const action = getDelItemAction(todoId);
            dispatch(action);
        },
        changeChecked(todoId, flag) {
            const action = getChangeItemFinishedAction(todoId, flag);
            dispatch(action);
        }
    }
};
export default connect(null, mapDispatchToProps)(Item)