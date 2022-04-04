import React, { Component } from 'react'
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
//引入包的原则：第三方的包往上靠，自己的包往下靠,样式写到下面

export default class App extends Component {
    // state={todos:['吃饭','睡觉']}
    // 你不能用一个字符串来表示吃饭，吃饭得是一个todo对象

    //注意：状态在哪里，操作状态的方法就写在哪里!!!!!!!!!
    //初始化状态
    state = {
        todos: [
            { id: '001', name: '吃饭', done: true },
            { id: '002', name: '睡觉', done: true },
            { id: '003', name: '打代码', done: false },
            { id: '004', name: '逛街', done: false }
        ]
    }

    //函数是父上定义的，然后在子上调用
    //addTodo函数用于添加一个todo,接收的参数是todo对象
    addTodo = (todoObj) => {
        // console.log('app', todoObj)
        //获取原todos
        const { todos } = this.state
        //前面追加一个todo对象
        const newTodos = [todoObj, ...todos]
        //更新状态
        this.setState({ todos: newTodos })
    }

    //updateTodo用于更新一个todo
    updateTodo = (id, done) => {
        //固定套路，获取原todos
        const { todos } = this.state
        //遍历,找到要更新的todo
        //匹配处理数据
        const newTodos = todos.map(item => {
            if (item.id === id) return { ...item, done: done }
            //如果函数参数里面的id和我遍历的某个id是相等的
            else return item
        })
        this.setState({ todos: newTodos })
        //把原todos改成新的newTodos(差就差在把某个id的todo改了它的done值)
    }

    //deleteTodo用于删除一个todo
    deleteTodo = (id) => { 
        //固定套路，获取原todos
        const { todos } = this.state
        //遍历,找到要删除的todo
        //匹配处理数据
        const newTodos = todos.filter(item => {
           return item.id !== id
        })
        this.setState({ todos: newTodos })
    }
    //checkAllTodo用于全选
    checkAllTodo = (done) => {
        //固定套路，获取原todos
        const { todos } = this.state
        //加工数据
        const newTodos = todos.map(item => {
            return {...item,done:done}
        })
        //更新状态
        this.setState({ todos: newTodos })
    }
    //clearAllDone用于清除所有已完成任务
    clearAllDone = () => {
        //固定套路，获取原todos
        const { todos } = this.state
        //加工数据
        const newTodos = todos.filter(item => !item.done)
        //更新状态
        this.setState({ todos: newTodos })
     }
    render() {
        // const { todos } = this.state.todos
        // 没注意写成上面这样，找了半天错
        const { todos } = this.state
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    <Header funcAdd={this.addTodo} />
                    {/* 子传父，是通过在父上定义一个函数funcAdd，子调用该函数 */}
                    <List todos={todos} funcUpdate={this.updateTodo} funcDelete={this.deleteTodo}/>
                    <Footer todos={todos} funcCheckAllTodo = {this.checkAllTodo} funcClearAllDone={this.clearAllDone}/>
                </div>
            </div>
        )
    }
}

