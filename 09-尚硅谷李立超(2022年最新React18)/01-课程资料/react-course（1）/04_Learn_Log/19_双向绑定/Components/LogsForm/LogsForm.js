import React, {useState} from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = () => {

    /*
    *   当表单项发生变化时，获取用户输入的内容
    * */
    // 创建三个变量，用来存储表单中的数据
    // let inputDate = '';
    // let inputDesc = '';
    // let inputTime = 0;

    const [inputDate, setInputDate] = useState('');
    const [inputDesc, setInputDesc] = useState('');
    const [inputTime, setInputTime] = useState('');


    // 创建一个响应函数，监听日期的变化
    const dateChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        setInputDate(e.target.value);
    };

    // 监听内容的变化
    const descChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        setInputDesc(e.target.value);
    };

    //监听时长的变化
    const timeChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        setInputTime(e.target.value);
    };

    // 当表单提交时，汇总表单中的数据
    /*
    *   在React中，通常表单不需要自行提交
    *       而是要通过React提交
    * */
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

        // 清空表单项
        setInputDate('');
        setInputDesc('');
        setInputTime('');

        console.log(newLog);

        /*
        *   提交表单后如何清空表单中的旧数据
        *       现在这种表单，在React我们称为非受控组件
        *
        *   我们可以将表单中的数据存储到state中，
        *       然后将state设置为表单项value值，
        *       这样当表单项发生变化，state会随之变化，
        *       反之，state发生变化，表单项也会跟着改变，这种操作我们就称为双向绑定
        *       这样一来，表单就成为了一个受控组件
        *
        *
        *
        * */

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
