/**
 * @Author liming
 * @Date 2022/11/8 1:10
 **/

import React, {createRef, forwardRef, PureComponent} from 'react';

class Home extends PureComponent {
    render() {
        return <h2>Home</h2>
    }
}

// 高阶组件forwardRef
//函数式组件不能写ref,要用forwardRef封装
//ref是React内部管理的，不是使用props传递，但可以用forwardRef封装
const Profile = forwardRef(function(props, ref) {
    return <p ref={ref}>Profile</p>
})

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.titleRef = createRef()
        this.homeRef = createRef()
        this.profileRef = createRef();

    }

    render() {
        return (
            <div>
                <h2 ref={this.titleRef}>Hello World</h2>
                <Home ref={this.homeRef}/>

                <Profile ref={this.profileRef} name={"why"}/>

                <button onClick={e => this.printRef()}>打印ref</button>
            </div>
        );
    }

    printRef() {
        console.log(this.titleRef.current);
        console.log(this.homeRef.current);
        console.log(this.profileRef.current);
    }
}
