import React from "react";

/* 
this.setState([partialState],[callback])
  + 支持部分状态的更改
  + [callback]
    + 是在状态更改视图更新后触发执行的「在处理了componentDidUpdate周期函数后，执行callback」
    + 如果基于shouldComponentUpdate进行了拦截，视图并没有更新，也会把callback执行
    + 类似于vue中的$nextTick
 */
export default class Demo extends React.Component {
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