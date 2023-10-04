import React, { Component } from 'react'

export default class About extends Component {
    render() {
        // console.log('About组件收到的props是', this.props);
        // 这里About组件就可以收到一些东西了,比如history,location,match等
        return (
            <div>
            <h3>我是About的内容</h3>
            </div>
        )
    }
}
