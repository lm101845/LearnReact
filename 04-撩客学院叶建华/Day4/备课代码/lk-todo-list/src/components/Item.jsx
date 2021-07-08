import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class Item extends Component {
    constructor(props){
        super(props);
        this.state = {
            showDelBtn: false, // 是否显示删除按钮
        };
    }

    static propTypes ={
        // 用于接收任务数组
        todo: PropTypes.object.isRequired,
        // 修改完成状态
        changeTodoFinish: PropTypes.func.isRequired,
        // 删除记录
        removeTodo: PropTypes.func.isRequired
    };

    render(){
        const {todo} = this.props;
        const {showDelBtn} = this.state;
        return (
            <li
                onMouseOver={()=>this._hasShowBtn(true)}
                onMouseOut={()=>this._hasShowBtn(false)}
            >
                <label>
                    <input type="checkbox" checked={todo.finished} onChange={()=>this.props.changeTodoFinish(todo.id, !todo.finished)}/>
                    <span>{todo.title}</span>
                </label>
                <button
                    className="btn btn-warning"
                    style={{display: showDelBtn ? 'block': 'none'}}
                    onClick={()=>this.props.removeTodo(todo.id)}
                >
                    删除
                </button>
            </li>
        )
    }

    // 处理按钮显示和隐藏
    _hasShowBtn(flag){
        this.setState({
            showDelBtn: flag
        })
    }
}