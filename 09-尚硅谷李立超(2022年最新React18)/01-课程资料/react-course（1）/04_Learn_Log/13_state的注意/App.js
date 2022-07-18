import './App.css';
import {useState} from "react";

const App = () => {

    console.log('函数执行了 ---> 组件创建完毕！');
    /*
    *   state
    *     - state实际就是一个被React管理的变量
    *         当我们通过setState()修改变量的值时，会触发组件的自动重新渲染
    *     - 只有state值发生变化时，组件才会重新渲染
    *     - 当state的值是一个对象时，修改时是使用新的对象去替换已有对象
    *     - 当通过setState去修改一个state时，并不表示修改当前的state
    *         它修改的是组件下一次渲染时state值
    *     - setState()会触发组件的重新渲染，它是异步的
    *           所以当调用setState()需要用旧state的值时，一定要注意
    *           有可能出现计算错误的情况
    *           为了避免这种情况，可以通过为setState()传递回调函数的形式来修改state值
    *
    * */


    const [counter, setCounter] = useState(1);
    const [user, setUser] = useState({name: '孙悟空', age: 18});

    const addHandler = () => {
        setTimeout(() => {
            // setCounter(counter + 1); // 将counter值修改为2
            setCounter((prevCounter)=>{

                /*
                *   setState()中回调函数的返回值将会成为新的state值
                *       回调函数执行时，React会将最新的state值作为参数传递
                * */
                return prevCounter + 1;
            });

            // setCounter(prevState => prevState + 1);
        }, 1000);

        // setCounter(2);
        // setCounter(3);
        // setCounter(4);
        // setCounter(5);
        // setCounter(6);
    };

    const updateUserHandler = () => {
        // setUser({name:'猪八戒'});

        // 如果直接修改旧的state对象，由于对象还是那个对象，所以不会生效
        // user.name = '猪八戒';
        // console.log(user);
        // setUser(user);

        // const newUser = Object.assign({}, user);
        // newUser.name = '猪八戒';
        // setUser(newUser);

        setUser({...user, name: '猪八戒'});


    };

    return <div className={'app'}>
        <h1>{counter} -- {user.name} -- {user.age}</h1>
        <button onClick={addHandler}>1</button>
        <button onClick={updateUserHandler}>2</button>
    </div>;
};

// 导出App
export default App;
