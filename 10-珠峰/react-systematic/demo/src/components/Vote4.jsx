// export default Vote
import React from 'react'

/**
 * 基于extends实现继承
 *   1.首先基于call继承  React.Component.call(this)  //this->Parent类的实例p
 *      给创建的实例p设置了4个私有属性：props、context、refs、updater
 *        this.props = props;
 *        this.context = context;
 *        this.refs = emptyObject;
 *        this.updater = updater || ReactNoopUpdateQueue;
 *   2.再基于原型继承Parent.prototype.__proto__ === React.Component.prototype
 *   实例——>Parent.prototype->React.Component.prototype->Object.protorype
 *   实例除了具备Parent.prototype提供的方法外，还具备了React.Component.prototype原型上提供的方法：isReactComponent、setState、forceUpdate
 *
 *   3.只要自己设置了constructor,则内部第一句话一定要执行super()
 */
class Parent extends React.Component{
    // constructor(m,n,y) {
    //     super(10,20,30);   //this.props=10,this.context=20,this.updater=30
    //     //等价于React.Component.call(this)
    // }

    constructor(props) {
        //super();    //this.props=undefined,this.context=undefined,this.updater=undefined
        super(props);  //this.props=props,this.context=undefined,this.updater=undefined
    }

    x = 100;   //实例属性
    //原型方法
    getX(){

    }
}

let p1 = new Parent()
let p2 = new Parent(10)
console.log(p1)
console.log(p2)


