import React, {Component} from 'react';

// 引入组件
import Head from './components/Head';
import List from './components/List';
import Foot from './components/Foot';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, title: '看一小时React课程', finished: false},
                {id: 2, title: '看一小时Vue课程', finished: false},
                {id: 3, title: '打一小时台球', finished: false},
                {id: 4, title: '看一小时Python', finished: false},
            ],
            finishedCount: 0
        }
    }

    // 1.修改完成状态
    changeTodoFinish = (todoId, isFinished) => {
        // 1.1 从数组中取出该对象
        let tempTodos = this.state.todos, finishedFlag = 0;
        tempTodos.forEach((todo, index) => {
            if (todo.id === todoId) {
                todo.finished = isFinished;
            }
            if (todo.finished) {
                finishedFlag += 1;
            }
        });

        // 1.2 更新状态
        this.setState({
            todos: tempTodos,
            finishedCount: finishedFlag
        });
    };

    // 2.删除一条记录
    removeTodo = (todoId) => {
        // 2.1 从数组中取出该对象
        let tempTodos = this.state.todos, finishedFlag = 0;
        tempTodos.forEach((todo, index) => {
            if (todo.id === todoId) {
                tempTodos.splice(index, 1);
            }
        });

        tempTodos.forEach((todo) => {
            if (todo.finished) {
                finishedFlag += 1;
            }
        });

        // 2.2 更新状态
        this.setState({
            todos: tempTodos,
            finishedCount: finishedFlag
        });
    };

    // 3. 添加一条记录
    addOneTodo = (todo) => {
        // 3.1 从数组中取出该对象
        let tempTodos = this.state.todos;
        tempTodos.push(todo);
        // 3.2 更新状态
        this.setState({
            todos: tempTodos
        });
    };

    // 4. 删除选中的任务
    delCheckedTodo = ()=>{
        // 2.1 从数组中取出该对象
        let tempTodos = this.state.todos;
        let tempArr = [];
        tempTodos.forEach((todo, index) => {
            if (!todo.finished) {
               tempArr.push(todo)
            }
        });
        // 2.2 更新状态
        this.setState({
            todos: tempArr,
            finishedCount: 0
        });
    };


    render() {
        const {todos, finishedCount} = this.state;
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    {/*头部*/}
                    <Head
                        lastTodoId={todos.length === 0 ? 0 : todos[todos.length - 1].id}
                        addOneTodo={this.addOneTodo}
                    />
                    {/*列表*/}
                    <List
                        todos={todos}
                        changeTodoFinish={this.changeTodoFinish}
                        removeTodo={this.removeTodo}
                    />
                    {/*尾部*/}
                    <Foot finishedCount={finishedCount} totalCount={todos.length} delCheckedTodo={this.delCheckedTodo}/>
                </div>
            </div>
        );
    }
}

export default App;
