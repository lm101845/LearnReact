/*
 * @Author: liming
 * @Date: 2021-08-11 10:07:29
 * @LastEditTime: 2021-08-11 21:31:10
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\components\Header\index.jsx
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// 有这个库，但是React没有帮你下载，所以要用这个库还需要你单独下载  
import { nanoid } from 'nanoid'
// 这个nanoid是一个函数，你每次调用的时候，都会生成一个字符串
import './index.css'
// console.log(nanoid());
// console.log(nanoid());
// console.log(nanoid());
export default class Header extends Component {

    //对接收的props进行类型以及必要性的限制
    static propTypes = {
        addTodo: PropTypes.func.isRequired
    }

    //键盘事件的回调
    handleKeyUp = (event) => {
        //解构赋值获取keyCode,target 
        const { keyCode,target } = event
        //绑定事件的元素和你要操作的元素是同一个，就没有必要打ref了
        // 我们需要在敲下回车的时候才进行输出，而不是我敲一个字就输出一个字
        // if (event.keyCode !== 13) return
        //判断是否是回车
        if (keyCode !== 13) return

        //添加的todo名字不能为空——添加这个判断
        if (target.value.trim() === '') {
            alert('输入不能为空！')
            return
            //return不要忘了写！！！不合法的就要拦住！！！！
        }
        // React中没有Vue里面的@enter这种自定义指令，需要我 们自己判断
        // console.log(event.target.value,event.keyCode);
        // console.log(target.value,keyCode);
        //准备一个todo对象
        // 新添加的一件事，done的初始值一定是false
        const todoObj = {id:nanoid(),name:target.value,done:false}
        // this.props.chuanaddTodo(target.value)
        // 你这么写只是把名字给传进去了，但是addTodo函数里的参数要的是一个todo对象，所以你还要把id和done给补充一下

        //将todoObj传递给App
        this.props.addTodo(todoObj)
        //最后一步要清空输入
        target.value = ''
    }
    render() {
        // console.log(this);
        // console.log(this.props.chuanaddTodo);
        // this.props.chuana(target.value)
        // 不要晕了，把函数写到这里了！！！！！
       return (
			<div className="todo-header">
               <input onKeyUp={this.handleKeyUp} type="text" placeholder="请输入你的任务名称，按回车键确认" />
               {/* 建议使用onKeyUp，代表这个按键真正的按完了 */}
			</div>
		)
	}
}
