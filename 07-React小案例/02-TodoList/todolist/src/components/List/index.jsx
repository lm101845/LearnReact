/* eslint-disable no-lone-blocks */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from '../Item'
import './index.css'
// List是父组件，Item是子组件
export default class List extends Component {
    //对接收的props进行：类型以及必要性的限制
    static propTypes = {
        todos: PropTypes.array.isRequired,
        funcUpdate: PropTypes.func.isRequired,
        funcDelete: PropTypes.func.isRequired
    }
    render() {
        const { todos, funcUpdate, funcDelete } = this.props
        //这个todos是父组件App给的
        return (
            <ul className="todo-main">
                {
                    todos.map(item => {
                        {/* return <Item key={item.id} id={item.id} name={item.name} done={item.done} /> */ }
                        // eslint-disable-next-line no-lone-blocks
                        {/* 这样写太麻烦，使用批量传递对象 */ }
                        {/* 再把父亲给的todos处理一下，再传给自己的儿子Item */ }
                        return <Item key={item.id} {...item} func2UpdateTodo={funcUpdate} func2DeleteTodo={funcDelete}/>
                        {/* 注意：这里 funcUpdate不用加this,因为它不是定义在类里面的东西，是从外面接过来的*/ }
                    })
                }
            </ul>
        )
    }
}
