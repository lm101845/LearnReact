import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDelBtn: false
        }
    }
    static propTypes = {
        todo: PropTypes.object.isRequired, // 单条数据
        removeTodoWithId: PropTypes.func.isRequired, // 删除一条记录
        changeTodoFinished: PropTypes.func.isRequired, // 删除一条记录
    };
    render() {
        const {todo, removeTodoWithId, changeTodoFinished} = this.props;
        const {showDelBtn} = this.state;
        return (
            <li
               onMouseOver={()=>this._hasShowBtn(true)}
               onMouseOut={()=>this._hasShowBtn(false)}
            >
                <label>
                    <input type="checkbox" checked={todo.finished} onChange={()=>changeTodoFinished(todo.id, !todo.finished)}/>
                    <span>{todo.title}</span>
                </label>
                <button
                    className="btn btn-warning"
                    style={{display: showDelBtn ? 'block' : 'none'}}
                    onClick={()=>removeTodoWithId(todo.id)}
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