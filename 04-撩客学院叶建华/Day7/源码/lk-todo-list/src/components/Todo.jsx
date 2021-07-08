import React, {Component} from 'react';
import Head from './Head'
import List from './List'
import Foot from './Foot'
import {getAllItemAction} from './../store/actionCreators'
import {connect} from 'react-redux'

class Todo extends Component {
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
        this.props.reqTodoList();
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        reqTodoList(){
            const action = getAllItemAction();
            dispatch(action);
        }
    }
};
export default connect(null, mapDispatchToProps)(Todo);
