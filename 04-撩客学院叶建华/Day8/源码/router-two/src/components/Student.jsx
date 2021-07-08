import React, {Component} from 'react';

export default class Student extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="student">
                学生中心
            </div>
        )
    }
}