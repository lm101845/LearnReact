/*
 * @Author: liming
 * @Date: 2020-12-07 16:43:34
 * @LastEditTime: 2021-08-11 20:45:51
 * @FilePath: \03-尚硅谷张天禹(好)\01-课程资料\源码\react_staging\03_src_TodoList案例\components\List\index.jsx
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'

export default class List extends Component {

	//对接收的props进行：类型、必要性的限制
	static propTypes = {
		todos:PropTypes.array.isRequired,
		updateTodo:PropTypes.func.isRequired,
		deleteTodo:PropTypes.func.isRequired,
	}

	render() {
		const {todos,updateTodo,deleteTodo} = this.props
		return (
			<ul className="todo-main">
				{
					todos.map( todo =>{
						return <Item key={todo.id} {...todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
					})
				}
			</ul>
		)
	}
}