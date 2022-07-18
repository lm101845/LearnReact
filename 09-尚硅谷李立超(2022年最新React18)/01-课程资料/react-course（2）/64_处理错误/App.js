import React, {useEffect, useState} from 'react';
import StudentList from "./components/StudentList";
import './App.css';


const App = () => {

    const [stuData, setStuData] = useState([]);

    // 添加一个state来记录数据是否正在加载,false表示没有加载数据，true表示加载
    const [loading, setLoading] = useState(false);

    // 创建一个state来记录错误信息
    const [error, setError] = useState(null);

    /*
    *   将写死的数据替换为从接口 http://localhost:1337/api/students
    *       中加载的数据
    *
    *   组件初始化时需要向服务器发送请求来加载数据
    * */
    useEffect(() => {
        //设置loading为true
        setLoading(true);
        // 重置错误
        setError(null);

        // 在effect中加载数据
        // fetch() 用来向服务器发送请求加载数据，是Ajax的升级版
        // 它需要两个参数：1.请求地址 2.请求信息
        fetch('http://localhost:1337/api/students')
            .then((res) => {
                // 判断是否正常返回响应信息
                if(res.ok){
                    // response表示响应信息
                    // console.log(res);
                    return res.json();// 该方法可以将响应的json直接转换为js对象
                }

                // 抛出一个错误
                throw new Error('数据加载失败！');
            })
            .then(data => {
                // 将加载到的数据设置到state中
                setStuData(data.data);

                // 数据加载完毕设置loading为false
                setLoading(false);
            })
            .catch((e) => {
                // catch中的回调函数，用来统一处理错误
                // catch一执行，说明上述代码出错了
                // 代码运行到这里，说明没有成功加载到数据
                setLoading(false);
                // 设置错误状态
                setError(e);
            });

    }, []);

    return (
        <div className="app">
            {(!loading && !error) && <StudentList stus={stuData}/>}
            {loading && <p>数据正在加载中...</p>}
            {error && <p>数据加载异常！</p>}
        </div>
    );
};

export default App;
