import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setName, setAge} from './store';

const App = () => {
    // useSelector() 用来加载state中的数据
    const student = useSelector(state => state.student);
    // 通过useDispatch()来获取派发器对象
    const dispatch = useDispatch();
    // 获取action的构建器


    const setNameHandler = () => {
        dispatch(setName('沙和尚'));
    };

    const setAgeHandler = () => {
        dispatch(setAge(33));
    };

    return (
        <div>
            <p>
                {student.name} ---
                {student.age} ---
                {student.gender} ---
                {student.address}
            </p>
            <button onClick={setNameHandler}>修改name</button>
            <button onClick={setAgeHandler}>修改age</button>
        </div>
    );
};

export default App;
