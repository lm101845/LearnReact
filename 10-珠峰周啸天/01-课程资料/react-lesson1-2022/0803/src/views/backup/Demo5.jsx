import React from "react";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    demo: {
        width: '300px',
        height: '200px',
        backgroundColor: 'lightblue',
        '& span': {
            color: 'green',
            fontSize: '12px'
        }
    }
});

// 高阶组件「闭包(柯理化思想)」
const widthStyles = function widthStyles(Component) {
    // Component:最后要渲染的组件Demo
    return function (props) { //0x001函数组件的堆
        const sty = useStyles(props);
        return <Component {...sty} />
    };
};

class Demo extends React.Component {
    render() {
        const { demo } = this.props;
        return <div className={demo}>
            <span>珠峰培训</span>
        </div>;
    }
}
export default widthStyles(Demo); //export default 0x001;