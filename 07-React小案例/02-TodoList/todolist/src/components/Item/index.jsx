/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './index.css'
export default class Item extends Component {
    //对接收的props进行：类型以及必要性的限制
    static propTypes = {
        func2UpdateTodo: PropTypes.func.isRequired,
        func2DeleteTodo: PropTypes.func.isRequired
    }
    state = { mouse: false }  //标识鼠标移入/移出


    //鼠标移入/移出的回调
    handleMouse = (flag) => {
        //这里要用高阶函数,不然这里函数会立即执行
        return () => {
            this.setState({ mouse: flag })
        }
    }
    //勾选,取消勾选某一个todo的回调
    //拿到id，拿到checked的值
    handleCheck = (id) => {
        return (event) => {
            // console.log(id,event.target.checked);
            this.props.func2UpdateTodo(id, event.target.checked)
        }
    }

    //删除一个todo的回调
    //下方onClick={() => this.handleDelete(id)}这样写就不用告阶写法了
    handleDelete = (id) => {
        if (window.confirm('确定删除吗？')) {
            this.props.func2DeleteTodo(id)
        }
    }
    render() {
        const { id, name, done } = this.props
        const { mouse } = this.state
        return (
            <li
                style={{ backgroundColor: mouse ? '#ddd' : 'white' }}
                onMouseEnter={this.handleMouse(true)}
                onMouseLeave={this.handleMouse(false)}
            >
                <label>
                    <input type="checkbox" ref={this.myRef} checked={done} onChange={this.handleCheck(id)} />
                    {/* 函数里面加小括号，就要写成高阶的形式，不然函数会直接运行了 */}
                    <span>{name}</span>
                </label>
                <button onClick={() => this.handleDelete(id)} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
            </li>
        )
    }
}
