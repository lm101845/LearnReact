import './App.css';
import {useState} from "react";

const App = () => {

  console.log('函数执行了 ---> 组件创建完毕！');

  /*
  * 在React中，当组件渲染完毕后，再修改组件中的变量，不会使组件重新渲染
  *   要使得组件可以收到变量的影响，必须在变量修改后对组件进行重新渲染
  *   这里我们就需要一个特殊变量，当这个变量被修改使，组件会自动重新渲染
  *
  * state相当于一个变量，
  *   只是这个变量在React中进行了注册，
  *   React会监控这个变量的变化，当state发生变化时，会自动触发组件的重新渲染
  *   使得我们的修改可以在页面中呈现出来
  *
  * 在函数组件中，我们需要通过钩子函数，获取state
  *
  * 使用钩子 useState() 来创建state
  *   import {useState} from "react";
  *
  * 它需要一个值作为参数，这个值就是state的初始值
  *   该函数会返回一个数组
  *     数组中第一个元素，是初始值
  *       - 初始值只用来显示数据，直接修改不会触发组件的重新渲染
  *     数组中的第二个元素，是一个函数，通常会命名为setXxx
  *       - 这个函数用来修改state，调用其修改state后会触发组件的重新渲染，
  *           并且使用函数中的值作为新的state值
  *
  *
  *
  *
  * */

  const [counter, setCounter] = useState(1);
  // let counter = result[0];
  // let setCounter = result[1];
  // const [counter, setCounter] = result;
  /*
  *   当点击+时，数字增大
  *   点击-时，数字减少
  * */

  // 创建一个变量存储数字
  // let counter = 2;

  const addHandler = () => {
    // 点击后数字+1
    // alert('+1');
    // counter++;
    setCounter(counter + 1); // 将counter值修改为2
  };

  const lessHandler = () => {
    // 点击后数字-1
    // alert('-1');
    // counter--;

    setCounter(counter-1);

  };

  return <div className={'app'}>
    <h1>{counter}</h1>
    <button onClick={lessHandler}>-</button>
    <button onClick={addHandler}>+</button>
  </div>;
};

// 导出App
export default App;
