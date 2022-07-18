import React from 'react';
import {useGetStudentsQuery} from "./store/studentApi";
import StudentList from "./components/StudentList";

const App = () => {

    // 调用Api查询数据
    // 这个钩子函数它会返回一个对象作为返回值，请求过程中相关数据都在该对象中存储
    const {data:stus, isSuccess, isLoading} = useGetStudentsQuery(); // 调用Api中的钩子查询数据
    return (
        <div>
            {isLoading && <p>数据加载中...</p>}
            {isSuccess && <StudentList stus={stus}/>}
        </div>
    );
};

export default App;
