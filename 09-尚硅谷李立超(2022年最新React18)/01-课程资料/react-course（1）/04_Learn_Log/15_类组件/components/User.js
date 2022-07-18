import React, {Component} from 'react';

class User extends Component {
    /*
    *   类组件的props是存储到类的实例对象中，
    *       可以直接通过实例对象访问
    *       this.props
    *   类组件中state统一存储到了实例对象的state属性中
    *       可以通过 this.state来访问
    *       通过this.setState()对其进行修改
    *           当我们通过this.setState()修改state时，
    *               React只会修改设置了的属性
    *
    *   函数组件中，响应函数直接以函数的形式定义在组件中，
    *       但是在类组件中，响应函数是以类的方法来定义，之前的属性都会保留
    *       但是这你仅限于直接存储于state中的属性
    *
    *   获取DOM对象
    *       1.创建一个属性，用来存储DOM对象
    *           divRef = React.createRef();
    *       2.将这个属性设置为指定元素的ref值
    * */

    // 创建属性存储DOM对象
    divRef = React.createRef();

    // 向state中添加属性
    state = {
        count: 0,
        test: '哈哈',
        obj: {name: '孙悟空', age: 18}
    };

    // 为了省事，在类组件中响应函数都应该以箭头函数的形式定义
    clickHandler = () => {
        // this.setState({count: 10});
        // this.setState(prevState => {
        //     return {
        //         count: prevState + 1
        //     }
        // });
        /*this.setState({
            obj:{...this.state.obj, name:'沙和尚'}
        });*/

        console.log(this.divRef);
    };


    render() {

        // console.log(this.props);
        // console.log(this.divRef);

        return (
            <div ref={this.divRef}>
                <h1>{this.state.count} --- {this.state.test}</h1>
                <h2>{this.state.obj.name} --- {this.state.obj.age}</h2>
                <button onClick={this.clickHandler}>点</button>
                <ul>
                    <li>姓名：{this.props.name}</li>
                    <li>年龄：{this.props.age}</li>
                    <li>性别：{this.props.gender}</li>
                </ul>
            </div>
        );
    }
}

export default User;
