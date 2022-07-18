import React from 'react';

const App = () => {

    /*
    *   React.Fragment
    *       - 是一个专门用来作为父容器的组件
    *           它只会将它里边的子元素直接返回，不会创建任何多余的元素
    *       - 当我们希望有一个父容器
    *           但同时又不希望父容器在网页中产生多余的结构时
    *           就可以使用Fragment
    * */

    return (
        <div style={{width: '750rem', height: 200, backgroundColor: '#bfa'}}></div>
    );
};

export default App;
