import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class Follow extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div style={{backgroundColor: 'green'}}>
                我是关注版块
                <p></p>
                <button>
                    <Link to="/login">关注一下</Link>
                </button>
            </div>
        )
    }
}