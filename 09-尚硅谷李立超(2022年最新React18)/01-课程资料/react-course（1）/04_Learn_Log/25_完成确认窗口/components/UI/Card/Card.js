import React from 'react';
import './Card.css';

const Card = (props) => {


    /*
    *   props.children 表示组件的标签体
    * */
    // console.log(props.children);
    return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
