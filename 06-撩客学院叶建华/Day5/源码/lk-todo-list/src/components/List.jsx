import React, {Component} from 'react';
import Item from './Item';
import store from './../store';

export default class List extends Component {
    constructor(props){
        super(props);
        // 获取redux中的数据
        this.state = store.getState();
        // 订阅store的改变
        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    render() {
        const {todos} = this.state;
        return (
            <ul className="todo-main">
                {
                    todos.map((todo, index) => (
                        <Item
                            key={index}
                            todo={todo}
                        />
                    ))
                }
            </ul>
        )
    }

    _handleStoreChange(){
       // 更新状态
       this.setState(store.getState())
    }
}