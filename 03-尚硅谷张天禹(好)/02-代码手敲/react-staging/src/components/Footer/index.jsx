/*
 * @Author: liming
 * @Date: 2021-08-11 10:09:03
 * @LastEditTime: 2021-08-11 23:44:17
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\components\Footer\index.jsx
 */
import React, { Component } from 'react'
import './index.css'
export default class Footer extends Component {
    //全选checkbox的回调
    handleCheckAll = (event) => {
        //全选不需要id是多少
        this.props.chuancheckAllTodo(event.target.checked)
        // 可以借助event来知道是勾了还是没有勾
        // this.props.checkAllTodo()
    }

    //清除已完成任务的回调
    handleClearAllDone = () => {
        //把所有done为true的都删掉
        //只要你想更新状态，你只能去麻烦App去了
        //传过来的chuanClearAllDone就要去用
        this.props.chuanClearAllDone()
    }
    render() {
        // console.log(this);
        const { chuantodos } = this.props
        //已完成的个数
        const doneCount = chuantodos.reduce((pre,current) => {
            // current就是每一个todo
            return pre + (current.done?1:0)
        }, 0)
        //  console.log(doneCount);
        //总数
        const total = chuantodos.length
        return (
               <div className="todo-footer">
        <label>
            {/* <input type="checkbox" defaultChecked={doneCount === total ? true : false} /> */}
            {/* 这个defaultChecked只在第一次起作用，以后都不起作用了，相等了也管不了了 */}
            <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total&& total!== 0? true : false} />
            {/* checked可以指定多次，始终以你最后一次指定为主 */}
            {/* 有一个问题：写了checked就写死了，这个checkbox就必须要勾选了，你还需要写onChange，让它可以变 */}
        </label>
        <span>
            <span>已完成{doneCount}</span> / 全部{ total}
        </span>
        <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>
      </div>
        )
    }
}
