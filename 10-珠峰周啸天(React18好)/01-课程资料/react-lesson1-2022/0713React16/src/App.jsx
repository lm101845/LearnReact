import React from "react";

export default class App extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0
    };
    handler = () => {
        let { x, y, z } = this.state;
        this.setState({ x: x + 1 });
        this.setState({ y: y + 1 });
        console.log(this.state);

        setTimeout(() => {
            let { x, z } = this.state;
            this.setState({ z: z + 1 });
            this.setState({ x: x + 1 });
            console.log(this.state);
        }, 1000);
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