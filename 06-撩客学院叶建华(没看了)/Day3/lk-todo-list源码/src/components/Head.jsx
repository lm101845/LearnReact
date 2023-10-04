import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Head extends Component{
    constructor(props){
        super(props);
        // 绑定ref
        this.myInput = React.createRef();
    }

    static propTypes = {
        lastTodoId: PropTypes.number.isRequired, // 最后一条记录的ID
        addOneTodo: PropTypes.func.isRequired   // 添加一条记录
    };

    render() {
        return (
            <div className="todo-header">
                <input
                    ref={this.myInput}
                    type="text"
                    placeholder="请输入今天的任务清单，按回车键确认"
                    onKeyDown={(e)=>this._handleEvent(e)}
                />
            </div>
        )
    }

    _handleEvent(e){
        const {lastTodoId, addOneTodo} = this.props;
        // 1. 判断是否是回车键
        if(13 === e.keyCode){
            // 2. 判断输入的内容是否为空
            if(!this.myInput.current.value){
                alert('输入的内容不能为空！');
                return;
            }
            // 3. 创建todo对象返回
            const todo =  {id: lastTodoId + 1, title: this.myInput.current.value, finished: false};
            addOneTodo(todo);
            // 4. 清空内容
            this.myInput.current.value = '';
        }
    }
}