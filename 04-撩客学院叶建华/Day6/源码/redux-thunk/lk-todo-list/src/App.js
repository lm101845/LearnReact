import React, {Component} from 'react';
import Head from './components/Head'
import List from './components/List'
import Foot from './components/Foot'
import store from './store'
import {getAllItemAction} from './store/actionCreators'

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

    componentDidMount() {
        const action = getAllItemAction();
        store.dispatch(action);
    }
}

export default App;
