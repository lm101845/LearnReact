import React, {Component} from 'react';
export default class Head extends Component {
    render(){
        return (
            <div className="todo-header">
                <input type="text" placeholder="请输入今天的任务清单，按回车键确认"/>
            </div>
        )
    }
}