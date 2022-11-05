/**
 * @Author liming
 * @Date 2022/11/5 21:42
 **/

import React, {Component, PureComponent} from 'react';

// export default class App extends Component {
export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            friends: [
                {name: "lilei", age: 20},
                {name: "lili", age: 18},
                {name: "lucy", age: 22},
            ]
        }
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log(this.state.friends,'1')
    //     console.log(nextState,'2')
    //     if(nextState.friends !== this.state.friends){
    //         return true
    //     }
    //     return false;
    // }

    render() {
        return (
            <div>
                <h2>好友列表</h2>
                <ul>
                    {
                        this.state.friends.map((item, index) => {
                            return (
                                <li
                                    key={item.name}>
                                    姓名：{item.name}
                                    --年龄：{item.age}
                                    --
                                    <button onClick={e => this.incrementAge(index)}>年龄+1</button>
                                </li>
                            )
                        })
                    }
                </ul>
                <button onClick={e => this.insertData()}>添加数据</button>
            </div>
        );
    }

    insertData() {
        // console.log('点击了')
        const newData = {name: "tom", age: 5}
        //1.这样做没有问题，但是在开发中不要这么做！！
        // this.state.friends.push(newData)
        // this.setState({
        //     friends:this.state.friends
        // })

        //2.推荐写法
        const newFriends = [...this.state.friends]
        newFriends.push({name: "tom", age: 5})
        this.setState({
            friends: newFriends
        })
    }

    incrementAge(index) {
        //1.不推荐写法
        // this.state.friends[index].age += 1;
        // this.setState({
        //     friends: this.state.friends
        // })

        //2.推荐写法
        const newFriends = [...this.state.friends]
        newFriends[index].age += 1;
        this.setState({
            friends:newFriends
        })
    }
}