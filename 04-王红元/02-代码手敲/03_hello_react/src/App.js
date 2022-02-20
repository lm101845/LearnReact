// 写法1
// import React from 'react';
// const { Component } = React;

// 写法2：
import React,{Component} from 'react';
// export default class App extends React.Component {
export default class App extends Component {
    constructor() {
        super()
        this.state = {
            counter: 0
        }
    }
    render() {
        return (
            <div>
                <h1>Hello React!</h1>
                <h2>当前计数</h2>
                <button>+</button>
                <button>-</button>
            </div>
        );
    }
}
