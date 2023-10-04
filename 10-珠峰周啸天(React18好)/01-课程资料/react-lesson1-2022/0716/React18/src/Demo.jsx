import React, { Component } from "react";

export default class Demo extends Component {
    state = {
        num: 0
    };

    /* handler(ev) {
        console.log(ev, this);
        // this->undefined
    } */

    /* // this.handler=()=>{};
    handler = (ev) => {
        // console.log(ev, this);
        this.setState({
            num: this.state.num + 10
        });
    }; */

    handler = (x, y, ev) => {
        console.log(x, y, ev);
    };

    render() {
        let { num } = this.state;
        return <div className="box">
            {num}
            <br />
            <button onClick={this.handler.bind(null, 10, 20)}>处理</button>

            {/* <button onClick={(ev) => {
                console.log(ev); //合成事件对象
                // ev.nativeEvent 查找原生事件对象
                this.setState({
                    num: num + 10
                });
            }}>处理</button> */}
        </div>;
    }
};