import React, { useState, useEffect, useLayoutEffect } from "react";

export default function Demo() {
    let [num, setNum] = useState(0);

    // useEffect向effect链表中增加的callback函数，会在真实DOM已经彻底渲染完毕后触发执行
    // useLayoutEffect向effect链表中增加的callback函数，在视图编译完，还没有渲染真实DOM之前，触发执行了
    /* useEffect(() => {
        if (num === 0) {
            let random = +String(Math.random()).substring(2);
            setNum(random);
        }
    }, [num]); */

    useEffect(() => {
        console.log('useEffect');
    }, [num]);

    useLayoutEffect(() => {
        console.log('useLayoutEffect');
    }, [num]);

    return <div
        style={{
            background: 'lightblue',
            WebkitUserSelect: 'none'
        }}
        onClick={() => {
            setNum(0);
        }}>
        {num}
    </div>;
};



/* export default function Demo() {
    let [num, setNum] = useState(10);

    /!* useEffect(() => {
        let timer = setTimeout(() => {
            console.log(num); //10
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []); *!/

    useEffect(() => {
        let timer = setTimeout(() => {
            console.log(num); //10 100
        }, 1000);

        // return () => {
        //     clearTimeout(timer);  //会把上一次设置的定时器移除掉
        // };
    }, [num]);

    return <div>
        <span>{num}</span>
        <button onClick={() => {
            setNum(100);
        }}>处理</button>
    </div>;
}; */

/* export default function Demo() {
    let [num, setNum] = useState(10),
        [x, setX] = useState(20);

    useEffect(() => {
        console.log('@1', num, x);
    });

    useEffect(() => {
        console.log('@2', num, x);
    }, []);

    useEffect(() => {
        console.log('@3', num, x);
    }, [num]);

    return <div>
        <span>{num}</span>
        <button onClick={() => {
            setNum(num + 1);
        }}>处理</button>

        <br />

        <span>{x}</span>
        <button onClick={() => {
            setX(x + 1);
        }}>处理</button>
    </div>;
}; */


/* const queryData = () => {
    return fetch('/api/subscriptions/recommended_collections')
        .then(response => response.json());
};

export default function Demo() {
    let [data, setData] = useState([]);

    // 第一次渲染完成，从服务器获取数据
    // Warning: useEffect must not return anything besides a function, which is used for clean-up.
    // useEffect(async () => {
    //     let result = await queryData();
    //     setData(result);
    // }, []);

    // useEffect(() => {
    //     queryData().then(value => {
    //         setData(value);
    //     });
    // }, []);

    useEffect(() => {
        const next = async () => {
            let result = await queryData();
            setData(result);
        };
        next();
    }, []);

    return <div>
        {data.map(item => {
            let { id, title } = item;
            return <span key={id}>
                {title}
            </span>;
        })}
    </div>;
}; */


/* export default function Demo() {
    let [num, setNum] = useState(10),
        [x, setX] = useState(20);

    // useEffect只能出现在函数组件的最外层，不能嵌套到判断、循环等操作中
    if (num < 10) {
        // React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render  react-hooks/rules-of-hooks
        useEffect(() => {
            console.log('第一次渲染完');
        }, []);
    }

    return <div>
        <span>{num}</span>
        <button onClick={() => {
            setNum(num + 1);
        }}>处理</button>

        <br />

        <span>{x}</span>
        <button onClick={() => {
            setX(x + 1);
        }}>处理</button>
    </div>;
}; */


/* export default function Demo() {
    let [num, setNum] = useState(10),
        [x, setX] = useState(20);

    // // 第一次渲染完 && 每一次更新完 触发执行
    // // componentDidMount && componentDidUpdate
    // useEffect(() => {
    //     console.log('@1', num, x);
    // });

    // // 第一次渲染完 触发执行
    // // componentDidMount
    // useEffect(() => {
    //     console.log('@2', num, x);
    // }, []);

    // // 第一次渲染完触发执行 && 只有依赖的num状态改变才会触发
    // useEffect(() => {
    //     console.log('@3', num, x);
    // }, [num]);

    // callback中返回的函数是在组件卸载之前触发
    // componentWillUnmount
    useEffect(() => {
        return () => {
            console.log('@4');
        };
    }, []);

    return <div>
        <span>{num}</span>
        <button onClick={() => {
            setNum(num + 1);
        }}>处理</button>

        <br />

        <span>{x}</span>
        <button onClick={() => {
            setX(x + 1);
        }}>处理</button>
    </div>;
}; */