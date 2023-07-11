import React from 'react'

// class Demo extends React.Component{
class Demo extends React.PureComponent{
    state = {
        arr:[10,20,30]   //0x001
    }
    render() {
        let {arr} = this.state
        console.log(this)
        return <div>
            {arr.map((item,index)=>{
                return <span key={index} style={{
                    display:'inline-block',width:100,height:100,background:'pink',marginRight:10,marginBottom:10}}>
                    {item}</span>
            })}
            <br/>
            <br/>
            <button onClick={()=>{
                arr.push(40)
                // this.setState({
                //     arr    //修改之前的状态地址还是0x001,无效
                // })
                this.forceUpdate()   //跳过shouldComponentUpdate   方法1
                this.setState({
                    arr:[...arr]     //方法2
                })
                console.log(arr,this.state.arr)
            }}>新增span</button>
        </div>
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     console.log('123')
    //     return true
    // }
}

export default Demo

/**
 * PureComponent和Component区别：
 *  PureComponen会给组件默认加一个shouldComponentUpdate生命周期
 */
