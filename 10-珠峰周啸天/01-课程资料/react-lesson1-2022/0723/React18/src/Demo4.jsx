import React, { useState, useMemo, useCallback, memo } from "react";


class Child1 extends React.PureComponent {
    render() {
        console.log('Child1 render');
        return <div>
            子组件1
            <button onClick={this.props.handler}>处理</button>
        </div>;
    }
}

/* class Child2 extends React.PureComponent {
    render() {
        console.log('Child2 render');
        return <div>
            子组件2
            <button onClick={this.props.handler}>处理</button>
        </div>;
    }
} */

// memo函数会对函数组件的属性进行浅比较，两次传递的属性值如果相同，则函数组件不会更新
const Child2 = memo(function Child2(props) {
    console.log('Child2 render');
    return <div>
        子组件2
        <button onClick={props.handler}>处理</button>
    </div>;
});


// useCallback  主要用于父子组件嵌套，父组件会基于属性把方法传递给子组件的情况中；useCallback可以保证父组件(函数组件)每次更新，不会创建新的函数堆，而是获取之前创建的函数引用，这样传递给子组件的函数值不会变化；
// 如果子组件做了优化，例如：PureComponent、memo...，则可以避免子组件的无效更新，节约一些性能！！
export default function Demo() {
    let [num, setNum] = useState(0);

    // 第一次执行：创建函数堆  0x001
    // 第二次执行：创建函数堆  0x003
    const handler1 = () => {
        console.log('方法一：哈哈哈');
    };

    // 第一次执行：创建函数堆  0x002
    // 第二次执行：不会创新新的函数，用的还是之前的值  0x002
    const handler2 = useCallback(() => {
        console.log('方法二：呵呵呵');
    }, []);

    return <div>
        <Child1 handler={handler1} />
        <Child2 handler={handler2} />
        <br />
        {num}
        <button onClick={() => setNum(100)}>更新父组件</button>
    </div>;
};






// 场景：视图中需要呈现的内容，是经过复杂且大量消耗性能的计算得来的
/* export default function Demo() {
    let [x, setX] = useState(10),
        [y, setY] = useState(20);

    // const computed = () => {
    //     console.log('计算中...');
    //     // 经过复杂的计算「依赖于x」
    //     return x;
    // };

    const cacheVal = useMemo(() => {
        // 经过复杂的计算「依赖于x」
        console.log('计算中...');
        return x;
    }, [x]);

    return <div>
        <span>{cacheVal}</span>
        &nbsp;
        <span>{y}</span>
        <br />
        <button onClick={() => setX(x + 1)}>修改X</button>
        <button onClick={() => setY(y + 1)}>修改Y</button>
    </div>;
}; */