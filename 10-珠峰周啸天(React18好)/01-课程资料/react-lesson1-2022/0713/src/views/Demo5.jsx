import React from "react";
import { flushSync } from 'react-dom';

export default class Demo extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0
    };
    handler = () => {
        let { x, y, z } = this.state;
        this.setState({ x: x + 1 });
        flushSync(() => {
            this.setState({ y: y + 1 });
        });
        this.setState({ z: z + 1 });
        console.log(this.state);
    };
    render() {
        console.log('render');
        let { x, y, z } = this.state;
        return <div className="demo">
            {x}-{y}-{z}
            <br />
            <button onClick={this.handler}>处理</button>
        </div>;
    }
};