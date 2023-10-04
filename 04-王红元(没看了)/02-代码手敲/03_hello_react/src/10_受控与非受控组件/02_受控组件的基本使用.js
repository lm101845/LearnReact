/**
 * @Author liming
 * @Date 2022/11/6 0:13
 **/

import React, {PureComponent} from 'react';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            username: 0
        }
    }

    render() {
        return (
            <div>
                {/*受控组件*/}
                <form onSubmit={e=>this.handleSubmit(e)}>
                    <label htmlFor="username">
                        用户：<input
                        type="text"
                        id="username"
                        onChange={e=>this.handleChange(e)}
                        value={this.state.username}
                    />
                    </label>
                    <input type="submit" value="提交"/>
                </form>
            </div>
        );
    }

    handleSubmit(event){
        //取消默认事件，我想自己来提交
        event.preventDefault()
        //要想自己提交，首先要拿到自己输入的东西
    }

    handleChange(event){
        // console.log(event.target.value);
        this.setState({
            username:event.target.value
        })
    }
}
