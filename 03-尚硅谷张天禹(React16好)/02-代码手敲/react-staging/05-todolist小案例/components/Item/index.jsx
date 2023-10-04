/*
 * @Author: liming
 * @Date: 2021-08-11 10:09:19
 * @LastEditTime: 2021-08-11 23:43:51
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\components\Item\index.jsx
 */
import React, { Component } from 'react'
import './index.css'
export default class Item extends Component {

    state = { mouse: false }
    //用于标识鼠标移入和移出
    
    //鼠标移入、移出的回调
    handleMouse = (flag) => {
        // console.log(flag);
        return () => {
            // console.log(flag);
            // 要这么写，写个函数返回值
            this.setState({
                mouse:flag
            })
        }
    }

    //勾选、取消勾选某一个todo的回调
    handleCheck = (id) => {
        //通知App你把id为xxx的状态改为true/false
        //onChange都加了小括号，所以要写成高阶的形式
        return (event) => {
            // console.log(id, event.target.value);
            //input框改成了checkbox，所以里面已经没有value属性了，有checked属性
            // console.log(id, event.target.checked);
            this.props.updateTodo(id,event.target.checked)

        }
    }

    //删除一个todo的回调
    handleDelete = (id) => {
        //拿到id即可
        // console.log('通知app删除', id);
        // this.props.chuandeleteTodo(id)
        if (window.confirm('确定删除吗')) {
            this.props.chuandeleteTodo2(id)
        }
    }
    render() {
        // console.log(this);
        const {id,name,done} = this.props;
        const { mouse} = this.state
        return (
            <li style={{backgroundColor:mouse?'#ddd':'white'}}onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)} >
                {/* 不是说不能调用，但是要有一个返回值 */}
                <label>
                    {/* <input type="checkbox" checked/> */}
                    <input type="checkbox" checked={done} onChange={this.handleCheck(id)} />
                    {/* 这个选框写了怎么没有效果啊，找了半天错没找出来 */}
                    {/* 我是这么写的defaultChecked={done}，应该是checked={done}*/}
                    {/* 呜呜呜，找了差不多半个小时，发现自己onChange={this.handleCheck}这样写的，没有写参数id..... */}
                    {/* 使用defaultChecked，表明刚开始是否勾选，后续还是可以更改的 */}
                    {/* <span>xxxxx</span> */}
                    {/* <span>name</span> */}
                    {/* 变量要写大括号 */}
                    <span>{ name}</span>
                </label>
                <button onClick={() => { this.handleDelete(id) }} className="btn btn-danger" style={{ display: mouse ? 'block' : 'none' }}>删除</button>
                {/*  onClick={() => { this.handleDelete(id) }}这么写就不用高阶了 */}
        </li>
        )
    }
}
