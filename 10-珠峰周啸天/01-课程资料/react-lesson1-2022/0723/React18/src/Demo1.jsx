import React, { useState } from "react";
import { flushSync } from 'react-dom';

export default function Demo() {
    console.log('render');
    let [num, setNum] = useState([10, 20]); //0x000
    const handler = () => {
        num.push(30);
        // setNum(num); //0x000
        setNum([...num]); //0x001
    };
    return <div>
        <span>{num.join('+')}</span>
        <button onClick={handler}>处理</button>
    </div>;
};

/* // 类组件中，当新老状态值相同，在没有设置shouldComponentUpdate或者继承PureComponent的前提下，render还会执行，重新生成新的虚拟DOM对象；只不过和原始虚拟DOM做对比的时候，发现一模一样，不需要重新更新为真实DOM；
export default class Demo extends React.PureComponent {
    state = {
        num: 10
    };
    render() {
        console.log('render');
        return <div>
            <span>{this.state.num}</span>
            <button onClick={() => {
                this.setState({
                    num: this.state.num
                });
            }}>处理</button>
        </div>;
    }
}; */

// 性能优化：修改的状态值和原始状态值一样「Object.is」
// 不会触发视图更新「也就是函数不会执行，而不是执行了做DOM-DIFF对比」
/* export default function Demo() {
    console.log('render');
    let [num, setNum] = useState(10);
    const handler = () => {
        setNum(num);
    };
    return <div>
        <span>{num}</span>
        <button onClick={handler}>处理</button>
    </div>;
}; */

/* // 惰性初始state
export default function Demo(props) {
    let [num, setNum] = useState(() => {
        let { x, y } = props,
            initial = x + y;
        return initial;
    });
    const handler = () => {
        setNum(num + 1);
    };
    return <div>
        <span>{num}</span>
        <button onClick={handler}>处理</button>
    </div>;
}; */

/* // 在更新队列中，多个修改状态方法统一批处理的时候，我们期望下一个方法执行的时候，可以获取上一个方法已经处理好的值；=>函数式更新
export default function Demo() {
    let [num, setNum] = useState(10);
    const handler = () => {
        for (let i = 0; i < 10; i++) {
            setNum(num => {
                return num + 1;
            });
        }
    };
    return <div>
        <span>{num}</span>
        <button onClick={handler}>处理</button>
    </div>;
}; */

/* 
函数组件中修改状态的方法和类组件中setState类似 
  React18
  建立了更新队列，实现批处理{修改状态的方法是异步操作的}

  React16
  出现在合成事件、周期函数中的状态更新，使用的是更新队列和批处理！
  但是出现在其他异步操作中，更新状态的方法是同步处理的！！
*/
/* export default function Demo() {
    console.log('render');
    let [x, setX] = useState(10),
        [y, setY] = useState(20);
    const handler = () => {
        // setX(x + 1);
        // setY(y + 1);

        // setTimeout(() => {
        //     setX(x + 1);
        //     setY(y + 1);
        // }, 1000);

        flushSync(() => {
            setX(x + 1);
        });
        setY(y + 1);
    };
    return <div>
        <span>{x}</span>
        &nbsp;&nbsp;
        <span>{y}</span>
        <button onClick={handler}>处理</button>
    </div>;
};
 */

/* // 推荐使用这种办法，实现多状态管理！！
export default function Demo() {
    let [x, setX] = useState(10),
        [y, setY] = useState(20);
    const handler = () => {
        setX(x + 1);
    };
    return <div>
        <span>{x}</span>
        &nbsp;&nbsp;
        <span>{y}</span>
        <button onClick={handler}>处理</button>
    </div>;
}; */

/* 
export default function Demo() {
    let [state, setState] = useState({
        x: 10,
        y: 20
    });
    const handler = () => {
        // 默认情况下，基于useState返回的修改状态的方法，不像类组件中的this.setState一样，不支持部分状态更改！
        // setState({
        //     x: state.x + 1
        // }); //=>{x:11}
        setState({
            ...state,
            x: state.x + 1
        });
    };
    return <div>
        <span>{state.x}</span>
        &nbsp;&nbsp;
        <span>{state.y}</span>
        <button onClick={handler}>处理</button>
    </div>;
}; 
*/

/* // 函数组件的第一次渲染和每一次更新，都是把函数重新执行「产生新的闭包」
export default function Demo() {
    let [num, setNum] = useState(10);
    const handler = () => {
        setNum(num + 1);
    };
    return <div>
        <span>{num}</span>
        <button onClick={handler}>新增</button>
    </div>;
}; */

/* 
let _state;
const useState = function useState(initial) {
    _state = _state || initial;
    function setState(state) {
        _state = state;
        // 通知视图更新
    }
    return [_state, setState];
}; 
*/

/* export default function Demo() {
    let num = 10;
    const handler = () => {
        num++;
        console.log(num);
    };
    return <div>
        <span>{num}</span>
        <button onClick={handler}>新增</button>
    </div>;
}; */