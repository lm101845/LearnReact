import React, {Component} from 'react';

export default class Recommend extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: 'yellow'}}>
                我是推荐版块
            </div>
        )
    }
}