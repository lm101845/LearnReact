import React, {useState} from 'react';
import A from "./components/A";

const App = () => {
    console.log('App渲染');
    const [count, setCount] = useState(1);

    const clickHandler = () => {
        setCount(prevState => prevState + 1);
    };

    return (
        <div>
            <h2>App -- {count}</h2>
            <button onClick={clickHandler}>增加</button>

            <A/>
        </div>
    );
};

export default App;
