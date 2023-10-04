import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

export default class List extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired, // 数据数组
        removeTodoWithId: PropTypes.func.isRequired, // 删除一条记录
        changeTodoFinished: PropTypes.func.isRequired, // 删除一条记录
    };

    render() {
        const {todos, removeTodoWithId, changeTodoFinished} = this.props;
        return (
            <ul className="todo-main">
                {
                    todos.map((todo, index) => (
                        <Item
                            key={index}
                            todo={todo}
                            removeTodoWithId={removeTodoWithId}
                            changeTodoFinished={changeTodoFinished}
                        />
                    ))
                }
            </ul>
        )
    }
}