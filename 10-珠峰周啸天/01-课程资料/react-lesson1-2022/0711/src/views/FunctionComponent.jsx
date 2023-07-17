import React from "react";
import PropTypes from 'prop-types';

const FunctionComponent = function FunctionComponent(props) {
    // let children = props.children; //获取的值:undefined/一个值/一个数组
    let children = React.Children.toArray(props.children), //这样可以保证children一定是个数组
        headSlots = children.filter(item => item.props.slot === 'head'),
        footSlots = children.filter(item => item.props.slot === 'foot');

    // console.log(Object.isFrozen(props)); //传递进来的props对象是被冻结的:不能删除/新增/修改/劫持...
    // props.x = 2000; //报错
    let { x } = props;
    x = 2000;

    console.log(props);

    return <div className="box">
        {headSlots}
        函数组件{x}
        {footSlots}
    </div>;
};
// 给props属性设置默认值
FunctionComponent.defaultProps = {
    num: 100
};
// 给属性设置规则 https://github.com/facebook/prop-types
FunctionComponent.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.string,
    arr: PropTypes.array
};


export default FunctionComponent;