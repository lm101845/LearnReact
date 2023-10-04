import React from "react";
import { createUseStyles } from 'react-jss';

// 构建视图中需要的样式
const useStyles = createUseStyles({
    demo: {
        width: '300px',
        height: '200px',
        backgroundColor: 'lightblue',
        '& span': {
            color: 'green',
            fontSize: '12px'
        }
    },
    title: {
        color: props => props.color,
        fontSize: '18px'
    },
    subTitle: props => {
        return {
            color: props.color,
            fontSize: '16px'
        };
    }
});

const Demo = function Demo(props) {
    const { demo, subTitle, title } = useStyles(props);

    return <div className={demo}>
        <h1 className={title}>珠峰培训</h1>
        <h2 className={`${title} ${subTitle}`}>珠峰培训</h2>
        <span>珠峰培训</span>
    </div>;
};
export default Demo;