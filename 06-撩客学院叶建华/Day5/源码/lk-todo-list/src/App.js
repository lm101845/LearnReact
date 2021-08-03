import React, {Component} from 'react';
import Head from './components/Head'
import List from './components/List'
import Foot from './components/Foot'
// import {getTodoList} from './api/index'
import store from './store'
import {initAllItem} from './store/actionCreators'

class App extends Component {
    render() {
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                    {/*头部*/}
                    <Head/>
                    {/*列表*/}
                    <List/>
                    {/*尾部*/}
                    <Foot/>
                </div>
            </div>
        );
    }

    /*async _reqTodoList(){
        const result = await getTodoList();
        console.log(result);
        if(result.success_code === 200){
            const action = getAllItemAction(result.items);
            store.dispatch(action);
        }
    }*/

    componentDidMount() {
        // this._reqTodoList();
        const action = initAllItem();
        store.dispatch(action);
        console.log(action);
    }
}

export default App;
