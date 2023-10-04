import React, {Component} from 'react';
import Head from './components/Head'
import List from './components/List'
import Foot from './components/Foot'

class App extends Component {
    constructor(props) {
        super(props);
    }
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
}

export default App;
