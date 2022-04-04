import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import './index.css'

export default class Header extends Component {
    //对接收的props进行：类型以及必要性的限制
    static propTypes = {
        funcAdd: PropTypes.func.isRequired
    }
    handleKeyUp = (event) => {
        
        //绑定事件的元素和你要操作的元素是同一个元素，就没有必要ref了
        const { keyCode, target } = event
        //判断是否是回车键，回车键是13
        if (keyCode !== 13) return

        // this.props.funcAdd(target.value)
        //但是你这样写，只是把todo名字给传过去，但是你还是要把todo对象给传过去

        //添加的todo名字不能为空
        if (target.value.trim() === '') {
            alert('输入不能为空')
            return 
            //这个return千万别忘了写
        }
        //准备好一个todo对象
        const todoObj = { id: nanoid(), name: target.value, done: false }
        //新添加的事情,肯定没做完,done肯定是false

        //将todoObj传递给App
        this.props.funcAdd(todoObj)

        //清空输入框
        target.value = ''
    }
    render() {
        // console.log(this.props);
        return (
            <div className="todo-header">
                <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
            </div>
        )
    }
}
