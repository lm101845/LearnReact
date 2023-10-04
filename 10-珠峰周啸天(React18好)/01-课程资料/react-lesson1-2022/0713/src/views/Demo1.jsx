import React from "react";

// 继承React.PureComponent，会默认创建一个shouldComponentUpdate周期函数，它默认在这个周期函数中，做了一个“浅比较”：拿最新要修改的属性和状态，和之前的属性状态进行比较，如果一样，则不去更新！！
const isObject = function isObject(obj) {
    return obj !== null && typeof obj === "object";
};
const shallowEqual = function shallowEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (!isObject(obj1) || !isObject(obj2)) return false;
    let keys1 = Reflect.ownKeys(obj1),
        keys2 = Reflect.ownKeys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let i = 0; i < keys1.length; i++) {
        let key = keys1[i];
        if (obj1[key] !== obj2[key]) return false;
    }
    return true;
};

export default class Demo extends React.PureComponent {
    state = {
        arr: [10, 20] //0x001
    };

    handler = () => {
        let { arr } = this.state;  //arr->0x001
        arr.push(30);
        /* this.setState({
            arr //arr=0x001 此时0x001中新增了30
        }); */
        /* this.setState({
            arr: [...arr] //arr->0x002
        }); */
        // this.forceUpdate(); //跳过shouldComponentUpdate钩子函数校验
    };

    /* shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props, this.state); //原始的属性和状态
        // console.log(nextProps, nextState); //即将要修改的属性和状态
        return !shallowEqual(this.props, nextProps) ||
            !shallowEqual(this.state, nextState);
    } */

    render() {
        console.log('render');
        let { arr } = this.state;
        return <div>
            {arr.join('+')}
            <br />
            <button onClick={this.handler}>处理</button>
        </div>;
    }
};