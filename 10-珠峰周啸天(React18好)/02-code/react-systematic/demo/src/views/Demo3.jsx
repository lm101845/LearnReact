import React from 'react'
class Demo extends React.Component{
    box3 = React.createRef()   //this.box3 = xxx
    render() {
        console.log(this)
        return <div>
            <h2 className="title" ref="titleBox">温馨提示</h2>
            <h2 className="title" ref={x=>this.box2=x}>友情提示</h2>
            <h2 className="title" ref={this.box3}>郑重提示</h2>
        </div>
    }

    componentDidMount() {
        //第一次渲染完毕[virtualDOM已经变成真实DOM，此时我们可以获取需要操作的DOM元素]
        console.log(document.querySelector('.title'))    //不推荐
        console.log(this.refs.titleBox)  //不推荐
        console.log(this.box2,'推荐这种')   //x就是DOM实例，把DOM实例赋给box2属性
        console.log(this.box3.current)
    }
}

export default Demo

/**
 * 受控组件：基于修改数据，让视图更新，达到需要的效果(玩数据)——推荐这个
 * 非受控组件：基于ref获取DOM元素，我们操作DOM元素来实现需求和效果
 */
