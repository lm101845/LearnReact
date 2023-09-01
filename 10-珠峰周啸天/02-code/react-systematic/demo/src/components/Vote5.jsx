/**
 * 从调用类组件[new Vote2{...}开始，类组件内部发生的事情]：
 *      1.初始化属性 & 规则校验
 *          即使我们自己不在constructor中处理[或者constructor都没写],在constructor处理完毕后，react内部也会把传递的props挂载到实例上
 *          所以在其他的函数中，只要保证this是实例,就可以基于this.props获取传递的属性
 *      2.初始化状态
 *          状态：后期修改状态，可以触发视图的更新
 *          需要手动初始化，如果我们没有去做相关的处理，则默认会往实例上挂载一个state,初始值是null
 */
import React from 'react'
import PropTypes from 'prop-types'
let supNum = 100,oppNum  = 5
class Vote extends React.Component{
    //类组件里面也可以设置规则校验
    static defaultProps = {
        num: 0
    }

    static propTypes = {
        title:PropTypes.string.isRequired,
        num:PropTypes.number
    }
    //这个render是放在原型上的
    //props通过constructor来接收
    //真实项目中，constructor写的几率不是很大
    // constructor(props) {
    //     // super();
    //     super(props);
    //     // console.log(this.props)
    //     console.log(this,'constructor-this')
    //
    // }

    //初始化状态
    state = {
        supNum:100,
        oppNum:50
    }
    render(){
        let {title} = this.props
        let {supNum,oppNum} = this.state
        console.log(this,'render--this')
        console.log('render函数执行了')
        // console.log('this.props',this.props)
        return <div className="vote-box">
            <div className="header">
                <h2 className="title">{title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <div className="main">
                <p>支持人数：{supNum}人</p>
                <p>反对人数：{oppNum}人</p>
            </div>

            <div className="footer">
                <button onClick={()=>{supNum++;console.log('支持1',supNum,this.state.supNum)}}>支持1</button>
                <button onClick={()=>{this.state.supNum++;console.log('支持1',supNum,this.state.supNum)}}>支持2</button>
                <button onClick={()=>{
                    this.setState({
                        supNum:supNum + 1
                    });
                    console.log('支持3',supNum,this.state.supNum)
                }}>支持3</button>
                <button onClick={()=>{
                    this.state.oppNum++
                    this.forceUpdate()       //强制更新也可以,但不推荐
                }}>反对</button>
            </div>
        </div>
    }

    //周期函数(钩子函数)
    // componentWillMount() {
    UNSAFE_componentWillMount() {
        console.log('第一次渲染之前')
    }

    shouldComponentUpdate(nextProps, nextState) {
        //nextState存储要修改的最新状态
        //this.state存储的还是修改前的状态[此时状态还没改变]
        //返回true:允许更新，会继续执行下一操作
        console.log('shouldComponentUpdate',this.state,nextState)
        return true
    }
}

export default Vote
