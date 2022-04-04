/*
 * @Author: liming
 * @Date: 2021-08-11 10:09:34
 * @LastEditTime: 2021-08-11 22:44:26
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\components\List\index.jsx
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'
export default class List extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        updateTodo: PropTypes.func.isRequired,
        chuandeleteTodo: PropTypes.func.isRequired,
    }
    render() {
        // 这里的this是List实例，里面的props是有内容的
        // console.log(this);
         /*为了看的更清楚，我特意写的不一样，传的是chuantodos,里面内容是todos*/
        const {todos,updateTodo,chuandeleteTodo} = this.props
        // List接到了chuanupdateTodo，但是不是它自己用，而是给它儿子Item用
        return (
            <ul className="todo-main">
                {
                    todos.map(todo => {
                        // chuantodos是一个数组，里面的每一项是todo
                        // return <Item key={todo.id} id={todo.id} name={todo.name} done={todo.done} />
                        // 这样写不好，如果一个todo有100个信息，你不能一个一个写吧

                        // 写法2：一堆东西可以使用...来进行批量传递
                        // 嗯，todo本身是一个对象，使用...可以批量的把东西都传进去
                        return <Item key={todo.id} {...todo} updateTodo={updateTodo} chuandeleteTodo2={ chuandeleteTodo}/>
                        // 注意：这个chuanupdateTodo也是我从外面接过来的，所以不要加这个this
                    })
                }
            </ul>
        )
    }
}
