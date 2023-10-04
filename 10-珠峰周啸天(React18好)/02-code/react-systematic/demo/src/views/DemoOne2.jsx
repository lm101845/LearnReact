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
    return <div className="demo-box">
        {children[0]}
        <br/>
        <h2 className="title">{title}</h2>
        <span>{x}</span>
        <br/>
        {children[1]}
    </div>
}
DemoOne.defaultProps = {
    x:0
}
export default DemoOne
