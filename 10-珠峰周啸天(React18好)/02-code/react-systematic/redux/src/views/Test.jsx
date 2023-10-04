/**
 * @Author liming
 * @Date 2023/9/1 18:01
 **/
import React, {useState, useMemo, useEffect} from 'react';

const Test = (props) =>{
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const memoizedCount = useMemo(() => count * 2, [count]);

    return (
        <div>
            <p>Count: {count}</p>
            <p>Memoized Count: {memoizedCount}</p>
            <button onClick={incrementCount}>Increment Count</button>
        </div>
    );
}

export default Test
