import React, { Component } from 'react'
import './index.css'
import C from '../01_setState'
export default class Parent extends Component {
    render() {
        return (
            <div className='parent'>
                <h3>我是Parent组件</h3>
                {/* <A x={100}/> */}
                <h4>我是h4的Hello</h4>
                {/* <A>Hello</A> */}
                {/* 写法1 */}
                {/* <A>
                    <B/>
                 
                </A> */}
                {/* 我们这里是把B组件作为A的标签体内容给写进来的 */}
                {/* 使用这种方式方式让A,B成了父子 */}
                {/* 我只想用A，B的时候才确定它们两个是父子(定义的时候看不出来) */}
                {/* 组件标签,标签体里面的内容是this.props里面特殊的属性，叫children */}

                {/* 写法2 */}
                {/* <A render={() => <B />} /> */}
                {/* <A render={(name) => <B name={ name}/>} /> */}
                {/* <A render={(name) => <C name={name} />} /> */}
                <A peiqi={(name) => <C name={name} />} />
                {/* 卧槽！！！！！牛皮！！！！！！！！ */}
                {/* 这个就相当于Vue里面的插槽技术！！！ */}
                {/* 箭头函数有花括号有自动return的功能 */}
                {/* 你给A传递了一个标签属性，名为render，值为一个函数，该函数调用的一个返回值为B组件*/}

                {/* 注意：函数名render随便写，写peiqi也行！！！ */}
            </div>
        )
    }
}

class A extends Component {
    state = {name: 'tom'}
    render() {
        // console.log(this.props);
        const { name} = this.state
        return (
            <div className='a'>
                <h3>我是A组件</h3>
                {/* A,B为父子写法方式一 */}
                {/* {this.props.children} */}
                {/* A,B为父子写法方式二 */}
                {/* <B name={ this.state.name}/> */}
                {/* { this.props.render() } */}
                {/* {this.props.render(name)} */}
                {/* 这个就相当于是插槽了！！！！ */}
                {this.props.peiqi(name)}
            </div>
        )
    }
}

class B extends Component {
    render() {
        console.log('B');
        // 你在A组件里面【使用】了{ this.props.children}，则表示A使用了B,此时B也渲染了
        return (
            <div className='b'>
                {/* <h3>我是B组件</h3> */}
                <h3>我是B组件,{ this.props.name}</h3>
            </div>
        )
    }
}
