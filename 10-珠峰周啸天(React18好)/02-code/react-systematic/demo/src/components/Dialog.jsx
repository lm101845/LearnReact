import PropTypes from "prop-types";
import React from 'react'
const Dialog = function Dialog(props){
    let {title,content,children} = props
    //获取传递的属性和插槽信息
    children = React.Children.toArray(children)
    //把children变成数组
    return <div className="dialog-box" style={{width:300}}>
        <div className="header" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <h2 className="title">{title}</h2>
            <span>X</span>
        </div>
        <div className="main">
            {content}
        </div>
        {children.length > 0 ? <div className="footer">{children}</div> : null}
    </div>
}

//属性规则校验
Dialog.defaultProps = {
    title:"温馨提示"
}

Dialog.protoTypes = {
    title:PropTypes.string,
    content:PropTypes.string.isRequired
}
export default Dialog
