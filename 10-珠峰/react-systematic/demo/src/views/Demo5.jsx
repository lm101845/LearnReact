import React from 'react'

class Demo extends React.Component{
    state = {
        x:10,
        y:5,z:0
    }
    handler = ()=>{
        //this->实例[宿主环境]
        let {x,y,z} = this.state
        //触发一次更新
        // this.setState({
        //     x:x+1,
        //     y:y+1,
        //     z:z+1
        // },()=>{
        //     console.log('回调函数,会发生在componentDidUpdate函数之后执行')
        // })

        //触发?次更新——也是一次(因为setState默认是异步操作[实现状态批处理],放在定时器里面，就可以手动变成[同步]了)
        // this.setState({x:x+1})
        // console.log(this.state.x,'还是之前的值')
        // this.setState({y:y+1})
        // console.log(this.state.y,'还是之前的值')
        // this.setState({z:z+1})
        // console.log(this.state.z,'还是之前的值')


        //不同时间的定时器
        // setTimeout(()=>{
        //     this.setState({x:x+1})
        //     console.log(this.state.x,'还是之前的值吗——是的')
        //     console.log(this.state.y,'还是之前的值吗——是的')
        //     console.log(this.state.z,'还是之前的值吗——是的')
        // },1000)
        //
        // setTimeout(()=>{
        //     this.setState({y:y+1})
        //     console.log(this.state.x,'更新后的值')
        //     console.log(this.state.y,'还是之前的值吗——是的')
        //     console.log(this.state.z,'还是之前的值吗——是的')
        // },2000)
        //
        // setTimeout(()=>{
        //     this.setState({z:z+1})
        //     console.log(this.state.x,'更新后的值')
        //     console.log(this.state.y,'更新后的值')
        //     console.log(this.state.z,'还是之前的值吗——是的')
        // },3000)

        //但如果三个定时器同时间，则会渲染一次
        setTimeout(()=>{
            this.setState({x:x+1})
            console.log(this.state.x,'还是之前的值吗——是的')
            console.log(this.state.y,'还是之前的值吗——是的')
            console.log(this.state.z,'还是之前的值吗——是的')
        },1000)

        setTimeout(()=>{
            this.setState({y:y+1})
            console.log(this.state.x,'更新后的值')
            console.log(this.state.y,'还是之前的值吗——是的')
            console.log(this.state.z,'还是之前的值吗——是的')
        },1000)

        setTimeout(()=>{
            this.setState({z:z+1})
            console.log(this.state.x,'更新后的值')
            console.log(this.state.y,'更新后的值')
            console.log(this.state.z,'还是之前的值吗——是的')
        },1000)
    }
    render() {
        console.log('render')
        let {x,y,z} = this.state
        return <div>
            x:{x}-y:{y}-z:{z}
            <br/>
            <button onClick={this.handler}>按钮</button>
        </div>
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate')
        return true
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        console.log('componentWillUpdate')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate-只要视图更新，就会触发')
    }

}

export default Demo

