import React from 'react'

class Demo extends React.Component{
    //Demo.prototype=>Demo.prototype.handle1 = function handle1(){}
    //基于React内部处理，如果我们给合成事件绑定了一个普通函数，当事件行为触发，绑定的函数执行，方法中this是undefined(不好)
    handle1() {
        console.log('点击了1')
        console.log(this)   //undefined  因为合成事件做了北部特殊处理，所以是undefined
    }

    handle2 = (ev) =>{
        console.log('点击了2')
        console.log(this)   //这个可以
        console.log(ev,'合成事件对象SyntheticBaseEvent')
    }

    handle3 = (x,y) =>{
        console.log('点击了2')
        console.log(this,'this')   //这个可以
        console.log('x,y',x,y)
    }
    render() {
        return <div>
            <button onClick={this.handle1}>按钮1</button>
            <button onClick={this.handle1.call(this)}>按钮2-1</button>
            <button onClick={this.handle1.bind(this)}>按钮2-2</button>
            {/*这样可以,render方法中this就是实例*/}
            {/*这里用bind，预处理，用call的话，你还没点击按钮，他就执行了*/}
            <button onClick={this.handle2}>按钮3</button>
            <button onClick={this.handle2}>按钮4</button>
            <button onClick={this.handle3.bind(this,1,2)}>按钮5</button>
            {/*如果想预先传参的话，箭头函数中，也要用bind了*/}
        </div>
    }

}

export default Demo

