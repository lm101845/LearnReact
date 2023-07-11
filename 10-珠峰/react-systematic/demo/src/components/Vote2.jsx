/**
 * 创建类组件
 *   创建一个构造函数(类)，要求必须继承React.Component/PureComponent
 *    +我们习惯于使用ES6中的class创建类,[因为方便]
 *    +必须给当前类设置一个render的方法[放在其原型上]:render方法中，返回需要渲染的视图
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

import React from 'react'
let supNum = 100,oppNum  = 5
class Vote extends React.Component{
    //这个render是放在原型上的
    render(){
        return <div className="vote-box">
            <div className="header">
                <h2 className="title">标题</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <div className="main">
                <p>支持人数：{supNum}人</p>
                <p>反对人数：{oppNum}人</p>
            </div>

            <div className="footer">
                <button onClick={()=>{supNum++;console.log(supNum)}}>支持</button>
                <button onClick={()=>{oppNum++;console.log(oppNum)}}>反对</button>
            </div>
        </div>
    }
}

export default Vote


/**
 * 使用构造函数创建类组件示例
 * @constructor
 */
function AAA(){
    React.Component.call(this)
    /**
     * 调用React.Component构造函数，并将当前对象作为构造函数的上下文（this）传递进去。
     * 这样做的目的是在AAA函数中使用React.Component的属性和方法时，确保正确的上下文环境。通过这样的调用，
     * AAA函数就可以继承React.Component的属性和方法，并且在实例化对象时，可以执行React.Component构造函数中的初始化逻辑。
     */
    this.state = {x:10,y:20}
}
Object.setPrototypeOf(AAA.prototype,React.Component.prototype)
/**
 * 将AAA函数的原型对象设置为React.Component的原型对象。通过这样的设置，AAA函数就可以继承React.Component的属性和方法。
 */
AAA.prototype = React.Component.prototype
AAA.prototype.sum = function (){}


