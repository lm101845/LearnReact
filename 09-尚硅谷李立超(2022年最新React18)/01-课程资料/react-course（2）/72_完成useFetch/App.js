import React, {useCallback, useEffect, useState} from 'react';
import StudentList from "./components/StudentList";
import './App.css';
import StuContext from "./store/StuContext";
import useFetch from "./hooks/useFetch";


const App = () => {

    const {data:stuData, loading, error, fetchData} = useFetch({
        url:'students'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const loadDataHandler = () => {
        fetchData();
    };

    return (
        <StuContext.Provider value={{fetchData}}>
            <div className="app">
                <button onClick={loadDataHandler}>加载数据</button>
                {(!loading && !error) && <StudentList stus={stuData}/>}
                {loading && <p>数据正在加载中...</p>}
                {error && <p>数据加载异常！</p>}
            </div>
        </StuContext.Provider>

    );
};

export default App;
