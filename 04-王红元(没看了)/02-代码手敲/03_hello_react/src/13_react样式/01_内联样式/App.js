/**
 * @Author liming
 * @Date 2022/11/8 17:16
 **/
import React, {PureComponent} from 'react';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            color:"pink"
        }
    }

    render() {
        const pStyle = {
            // color:"orange",
            color:this.state.color,
            textDecoration:"underline"
        }
        return (
            <div>
                {/*<h2 style={{"font-size":"50px"}}>我是标题</h2>*/}
                {/*不建议这样写*/}
                <h2 style={{fontSize:"50px",color:"red"}}>我是标题</h2>
                <p style={pStyle}>我是一段文字描述</p>
                App111
            </div>
        );
    }
}
