/**
 * @Author liming
 * @Date 2022/11/8 16:30
 **/

import React, {PureComponent,Fragment} from 'react';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            friends: [
                {name: "why", age: 18},
                {name: "lilei", age: 20},
                {name: "kobe", age: 25},
            ]
        }
    }

    render() {
        return (
            <>
                <h2>当前计数: {this.state.counter}</h2>
                <button onClick={e => this.increment()}>+1</button>
                <div>
                    {
                        this.state.friends.map((item, index) => {
                            return (
                                <Fragment key={item.name}>
                                    {/*如果有key的话就不能写短语法了 */}
                                    <div>{item.name}</div>
                                    <p>{item.age}</p>
                                    <hr/>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </>
        )
    }
    increment(){
        this.setState({
            counter:this.state.counter + 1
        })
    }

}
