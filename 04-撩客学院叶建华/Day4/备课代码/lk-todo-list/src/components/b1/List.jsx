import React, {Component} from 'react';
import PropTypes from 'prop-types';
export default class List extends Component {
   static propTypes ={
         todos: PropTypes.array.required
   };

    render(){
        return (
            <ul className="todo-main">
                <li>
                    <label>
                        <input type="checkbox"/>
                        <span>React-撩课前后端分离项目-管理系统1</span>
                    </label>
                    <button className="btn btn-warning" style={{display: 'none'}}>删除</button>
                </li>
                <li>
                    <label>
                        <input type="checkbox"/>
                        <span>React-撩课前后端分离项目-管理系统2</span>
                    </label>
                    <button className="btn btn-warning" style={{display: 'none'}}>删除</button>
                </li>
            </ul>
        )
    }
}