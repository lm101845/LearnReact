import React from "react";

export default class Demo extends React.Component {
    // 构建Model层
    state = {
        msg: '你好世界',
        text: '哈哈哈'
    };

    change = ev => {
        this.setState({
            text: ev.target.value
        });
    };

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                msg: 'hello world'
            });
        }, 1000);
    }

    render() {
        let { msg, text } = this.state;
        return <div className="box">
            {msg}
            <br />
            <input type="text" value={text} onChange={this.change} />
            {text}
        </div>;
    }
};