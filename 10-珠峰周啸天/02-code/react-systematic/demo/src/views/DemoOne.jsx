import PropTypes from 'prop-types'
import React from 'react'

console.log(React)
const DemoOne = function DemoOne(props){
    let {title,x,children} = props
    //要对children的类型做处理
    //可以基于React.children对象中提供的方法，对props.children做处理：count/forEach/map/toArray
    // if(!children){
    //     children = []
    // }else if(!Array.isArray(children)){
    //     children = [children]
    // }
    children = React.Children.toArray(children)
    let headerSlot = [],
        footerSlot = [],
        defaultSlot = []
    children.forEach(child=>{
        //传递进来的插槽信息，都是编译为virtualDOM后传递进来的[而不是传递的标签]
        console.log('child======》',child)
        console.log('child======》',child.props.slot)
        let {slot} = child.props
        if(slot ==='header'){
            headerSlot.push(child)
        }else if(slot === 'footer'){
            footerSlot.push(child)
        }else{
            defaultSlot.push(child)
        }
    })
    return <div className="demo-box">
        {/*{children[0]}*/}
        {headerSlot}
        <br/>
        <h2 className="title">{title}</h2>
        <span>{x}</span>
        <br/>
        {/*{children[1]}*/}
        {footerSlot}
    </div>
}
DemoOne.defaultProps = {
    x:0
}
export default DemoOne
