import React, {useState} from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = (props) => {

    const [inputDate, setInputDate] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [inputTime, setInputTime] = useState('');


    // 创建一个响应函数，监听日期的变化
    const dateChangeHandler = (e) => {
        setInputDate(e.target.value);
    };

    // 监听内容的变化
    const descChangeHandler = (e) => {

        setInputDesc(e.target.value);

    };

    //监听时长的变化
    const timeChangeHandler = (e) => {
        setInputTime(e.target.value);
    };

    // 当表单提交时，汇总表单中的数据
    const formSubmitHandler = (e) => {
        // 取消表单的默认行为
        e.preventDefault();
        // 获取表单项中的数据日期、内容、时长
        // 将数据拼装为一个对象
        const newLog = {
            date: new Date(inputDate),
            desc: inputDesc,
            time: +inputTime
        };

        // 当要添加新的日志时，调用父组件传递过来的函数
        props.onSaveLog(newLog);

        // 清空表单项
        setInputDate('');
        setInputDesc('');
        setInputTime('');




    };

    return (
        <Card className="logs-form">
            <form onSubmit={formSubmitHandler}>
                <div className="form-item">
                    <label htmlFor="date">日期</label>
                    <input onChange={dateChangeHandler} value={inputDate} id="date" type="date"/>
                </div>
                <div className="form-item">
                    <label htmlFor="desc">内容</label>
                    <input onChange={descChangeHandler} value={inputDesc} id="desc" type="text"/>
                </div>
                <div className="form-item">
                    <label htmlFor="time">时长</label>
                    <input onChange={timeChangeHandler} value={inputTime} id="time" type="number"/>
                </div>
                <div className="form-btn">
                    <button>添加</button>
                </div>
            </form>
        </Card>
    );
};

export default LogsForm;
