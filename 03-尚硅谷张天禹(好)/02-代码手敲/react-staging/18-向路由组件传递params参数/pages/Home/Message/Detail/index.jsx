import React, { Component } from 'react'
const Detaildata = [
    { id:'01',content:'你好，中国'},
    { id:'02',content:'你好，尚硅谷'},
    { id:'03',content:'你好，未来的自己'},
]
export default class Detail extends Component {
    render() {
        //接收params参数
        const { id,title} = this.props.match.params
        console.log(this.props);
        // 看一下detail到底接收到什么东西了
        const findResult = Detaildata.find(detailObj => {
            return detailObj.id === id
        })
        return (
            <ul>
                <li>ID:{ id}</li>
                <li>TITLE:{ title}</li>
                <li>CONTENT:{ findResult.content}</li>
            </ul>
        )
    }
}
