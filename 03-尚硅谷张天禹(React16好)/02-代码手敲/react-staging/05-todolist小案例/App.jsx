/*
 * @Author: liming
 * @Date: 2021-08-04 22:35:08
 * @LastEditTime: 2021-08-11 23:44:07
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react-staging\src\App.jsx
 */

// 记得把class改成className
//style写成双花括号形式
import React, { Component } from 'react'
// import './components/Header'
// 我写成了这样，傻啦吧唧的找了半天的错。。。。。。
import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import './App.css'
//引入包的原则：第三方的包往上靠，自己的包往下靠,样式写到下面

export default class App extends Component {
    // state={todos:['吃饭','睡觉']}
    // 你不能用一个字符串来表示吃饭，吃饭得是一个todo对象
    //初始化状态
  	state = {todos:[
		{id:'001',name:'吃饭',done:true},
		{id:'002',name:'睡觉',done:true},
		{id:'003',name:'打代码',done:false},
		{id:'004',name:'逛街',done:false}
	]}
    
    // 如果想要子组件给父组件一些东西，就要求父当年通过props给子传递一些函数
    // 这个时候子在合适的时候，想给父传数据的时候，调用一下这个函数即可
    // addTodo = (data) => {
    // addTodo用于添加一个todo,接收的参数是todo对象
    addTodo = (todoObj) => {
        //addTodo是个函数，可以进行调用
        // 我需要你传过来的本身就是一个对象，你不要把名字直接给我甩过来
        // console.log('App',todoObj);
        // 获取原todos
        const { todos } = this.state
        //追加一个todo
        const newTodos = [todoObj, ...todos]
        //更新状态
        this.setState({
            todos:newTodos
        })
    }

    //更新一个todo
    //updateTodo用于更新一个todo对象
    //因为App和Item是祖孙关系，所以要先传给父亲List
    // 我自己写的，单选框总是选不中
    updateTodo = (id,done) => {
        //获取状态中的todos
        const {todos} = this.state

        //遍历todos，找到指定项，然后再把它给改掉
        //匹配并处理数据
        const newTodos = todos.map((todoObj) => {
            if (todoObj.id === id) return {...todoObj,done}
                //如果当前todoObj的id和我传过来的是一样的，那就说明要改这个的done状态了
            else return todoObj
        })

        this.setState({
            todos: newTodos
            //新的和旧的todos差在哪里？差在新的和旧的某个id改了它的done值
        })
    }

    //deleteTodo用于删除一个todo
    deleteTodo = (id) => { 
        //获取原来的todos
        const { todos } = this.state
        //删除指定id的todo对象
        const newTodos = todos.filter((todoObj) => {
            return todoObj.id !== id
        })
        //更新状态
        this.setState({
            todos: newTodos
        })
    }

    //checkAllTodo用于全选
    checkAllTodo = (isDone) => {
        //获取原来的newTodos
        const { todos } = this.state
        //加工数据
        const newTodos =todos.map((todoObj) => {
            return { ...todoObj, done: isDone }
            // 你在这里把done写死了，则footer只能全选，不能全取消
            // 所以最好有一个参数,告诉我你是全选还是全不选
        })

        //更新状态
        this.setState({
            todos:newTodos
        })
    }

    //clearAllDone用于清除所有以完成的done
    clearAllDone = () => {
        //获取原来的todos
        const { todos } = this.state
        //过滤数据
        const newTodos = todos.filter((todoObj) => {
            return !todoObj.done 
        })

        //更新状态
        this.setState({
            todos:newTodos
        })
    }
    render() {
        // console.log(this);
        // 这里的this是App实例，是空的
        const { todos} = this.state
        return (
            <div className="todo-container">
            <div className="todo-wrap">
                    {/* <Header a={ 1}/> */}
                    <Header addTodo={this.addTodo}/>
                    <List todos={todos} updateTodo={this.updateTodo} chuandeleteTodo={ this.deleteTodo}/>
                    {/* 第一个todos前面没有写this是因为return上面解构赋值，提前取好了 */}
                    {/* 父亲给儿子传东西就这样传 */}
                    <Footer chuantodos={todos} chuancheckAllTodo={this.checkAllTodo} chuanClearAllDone={ this.clearAllDone}/>
                    { /*状态中的数据驱动着页面的展示*/}
                    { /*目前，todos的一堆状态要放到App里面，否则我们写不下去*/}
                    { /*为了看的更清楚，我特意写的不一样，传的是chuantodos,里面内容是todos*/}
            </div>
            </div>
        )
    }
}
