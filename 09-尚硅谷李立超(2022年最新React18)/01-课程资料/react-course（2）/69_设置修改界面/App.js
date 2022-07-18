import React, {useCallback, useEffect, useState} from 'react';
import StudentList from "./components/StudentList";
import './App.css';
import StuContext from "./store/StuContext";


const App = () => {

    const [stuData, setStuData] = useState([]);

    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);

    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:1337/api/students');
            //判断请求是否加载成功
            if (res.ok) {
                const data = await res.json();
                setStuData(data.data);
            } else {
                throw new Error('数据加载失败！');
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);


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
