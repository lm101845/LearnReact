import React from 'react'

class Child1 extends React.Component{
    state = {
        x:100,
        y:200
    }
    render() {
        return <div>子组件1</div>
    }
}

// const Child2 = function Child2(){
//    return <div>
//        子组件2
//        <button>按钮</button>
//    </div>
// }

const Child2 = React.forwardRef(function Child2(props, ref){
    console.log(ref,'child2的ref，这样可以')
    return <div>
        子组件2
        <button ref={ref}>按钮</button>
    </div>
})
class Demo extends React.Component{
    render() {
        console.log(this,'this')
        return <div>
            <Child1 ref={x=>this.child1 = x}/>
            <Child2 ref={x=>this.child2 = x}/>
            {/*<Child2/>*/}
            {/*函数组件不能直接设置ref*/}
        </div>
    }

    componentDidMount() {
        console.log(this.child1)
        console.log(this.child2)
    }
}

export default Demo

