import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

const Child = forwardRef(function Child(props, ref) {
    const submit = () => {
        // ...
    };
    useImperativeHandle(ref, () => {
        return {
            submit,
            name: 'Child'
        };
    });
    return <div>
        <button>提交</button>
    </div>;
});

export default function Demo() {
    const box = useRef(null);

    useEffect(() => {
        console.log(box.current);
    }, []);

    return <div>
        <Child ref={box} />
    </div>;
};


//=============================
/* class Child extends React.Component {
    submit = () => {
        // ...
    };

    render() {
        return <div>
            <button>提交</button>
        </div>;
    }
} */

/* const Child = function Child() {
    const submit = () => {
        // ...
    };
    return <div>
        <button>提交</button>
    </div>;
};

// 如果子组件是一个类组件，我们为其设置ref，最后获取的是子组件的实例「可以调用子组件上提供的属性和方法」
// 函数子组件，我们不能为其直接设置ref：Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
export default function Demo() {
    const box = useRef(null);

    useEffect(() => {
        console.log(box.current);
    }, []);

    return <div>
        <Child ref={box} />
    </div>;
}; */


///==================================
/* let prev;
export default function Demo() {
    let [num, setNum] = useState(0);
    const btnBox = useRef(null);
    if (!prev) {
        prev = btnBox;
    } else {
        console.log(prev === btnBox);
    }

    useEffect(() => {
        console.log(btnBox.current);
    }, []);

    return <div>
        {num}
        <button ref={btnBox} onClick={() => {
            setNum(100);
        }}>按钮</button>
    </div>;
}; */

/* export default function Demo() {
    const btnBox = useRef(null);

    useEffect(() => {
        console.log(btnBox.current);
    }, []);

    return <div>
        <button ref={btnBox}>按钮</button>
    </div>;
}; */