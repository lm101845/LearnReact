import Logs from "./components/Logs/Logs";
import LogsForm from "./components/LogsForm/LogsForm";
import './App.css';
import {useState} from "react";

const App = () => {

    // 数据
    const [logsData, setLogsData] = useState([
        {
            id: '001',
            date: new Date(2021, 1, 20, 18, 30),
            desc: '学习九阳神功',
            time: 30
        },
        {
            id: '002',
            date: new Date(2022, 2, 10, 12, 30),
            desc: '学习降龙十八掌',
            time: 20
        },
        {
            id: '003',
            date: new Date(2022, 2, 11, 11, 30),
            desc: '学习JavaScript',
            time: 40
        },
        {
            id: '004',
            date: new Date(2022, 2, 15, 10, 30),
            desc: '学习React',
            time: 80
        }
    ]);

    /*
    *   下一步：
    *     将LogsForm中的数据传递给App组件，然后App组件，将新的日志添加到数组中！
    * */

    // 定义一个函数
    const saveLogHandler = (newLog) => {
        // 向新的日志中添加id
        newLog.id = Date.now() + '';

        // console.log('App.js -->',newLog);

        // 将新的数据添加到数组中
        // logsData.push(newLog);
        setLogsData([newLog, ...logsData]);

    };

    // 定义一个函数，从数据中删除一条日志
    const delLogByIndex = (index) => {
        setLogsData(prevState => {
            const newLog = [...prevState];
            newLog.splice(index, 1);
            return newLog;
        });
    };

    // 定义一个函数，从数据中删除一条日志
    const delLogById = (id) => {
        setLogsData(prevState => {
            return prevState.filter(item => item.id !== id);
        });
    };

    return <div className="app">
        {/*引入LogsFrom*/}
        <LogsForm onSaveLog={saveLogHandler}/>
        <Logs logsData={logsData} onDelLog={delLogById}/>
    </div>;
};

// 导出App
export default App;
