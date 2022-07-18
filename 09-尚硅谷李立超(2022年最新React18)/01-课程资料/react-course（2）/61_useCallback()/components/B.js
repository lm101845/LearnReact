import React from 'react';

const B = (props) => {
    console.log('B渲染');
    return (
        <div>
            <h2>组件B</h2>
            <p>{props.test && '哈哈'}</p>
        </div>
    );
};

/*
*   React.memo() 是一个高阶组件
*       它接收另一个组件作为参数，并且会返回一个包装过的新组件
*       包装过的新组件就会具有缓存功能，
*           包装过后，只有组件的props发生变化化
*           才会触发组件的重新的渲染，否则总是返回缓存中结果
* */

export default React.memo(B);

