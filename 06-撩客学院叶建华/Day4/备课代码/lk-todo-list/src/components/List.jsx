import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

export default class List extends Component {
   constructor(props){
       super(props);
       this.state = {
           showDelBtn: false, // 是否显示删除按钮
       };
   }

   static propTypes ={
         todos: PropTypes.array.isRequired, // 用于接收任务数组
         changeTodoFinish: PropTypes.func.isRequired,  // 修改完成状态
         removeTodo: PropTypes.func.isRequired   // 删除一条记录
   };

    render(){
        const {todos, changeTodoFinish, removeTodo} = this.props;
        console.log(todos);
        return (
            <ul className="todo-main">
                {todos.map((todo, index)=> (
                        <Item
                            key={index}
                            todo={todo}
                            changeTodoFinish={changeTodoFinish}
                            removeTodo={removeTodo}
                        />
                    ))}
            </ul>
        )
    }
}