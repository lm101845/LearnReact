import React, {Component} from 'react';

export default class StuList extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <ul>
                    <li>学生列表1</li>
                    <li>学生列表2</li>
                    <li>学生列表3</li>
                    <li>学生列表4</li>
                    <li>学生列表5</li>
                </ul>
            </div>
        )
    }
}