import React, { createRef, forwardRef } from "react";
import Child1 from "./Child1";
import Child2 from "./Child2";

/* 
 基于ref获取子组件实例
   把ref赋值给标签：获取DOM元素
   把ref赋值给类组件：获取类组件的实例
   把ref赋值给函数组件：报错

 遇到ref赋值给函数组件，它往往不是为了获取函数组件本身的啥东西，而是基于forwardRef实现ref的转发「获取函数组件(子组件)内部的某些元素」
 */
export default class Demo extends React.Component {
    ch1 = createRef();
    ch2 = createRef();
    render() {
        return <div>
            <Child1 ref={this.ch1} />
            <Child2 ref={this.ch2} />
        </div>;
    }

    componentDidMount() {
        console.log(this.ch1, this.ch2);
    }
};

/* 
// 基于createRef创建一个REF对象，把对象赋值给元素标签的ref属性；这样对应的DOM元素就会绑定给REF对象的current这个属性！！
export default class Demo extends React.Component {
    box = createRef();
    handler = () => {
        // console.log(this.box.current);
        this.box.current.innerHTML++;
    };
    render() {
        return <div>
            <span ref={this.box}>0</span>
            <br />
            <button onClick={this.handler}>处理</button>
        </div>;
    }
}; 
*/

/* // ref={函数}，在视图渲染的时候，会把这个函数执行；传递进来的实参就是当前标签的DOM元素对象，我们把其赋值给实例的一个私有属性即可！！
export default class Demo extends React.Component {
    handler = () => {
        // console.log(this.box);
        this.box.innerHTML++;
    };
    render() {
        return <div>
            <span ref={x => this.box = x}>0</span>
            <br />
            <button onClick={this.handler}>处理</button>
        </div>;
    }
}; */

/* 
//这样处理ref的语法已经不被支持了
export default class Demo extends React.Component {
    handler = () => {
        console.log(this.refs);
    };
    render() {
        return <div>
            <span ref='box'>0</span>
            <br />
            <button onClick={this.handler}>处理</button>
        </div>;
    }
}; 
*/