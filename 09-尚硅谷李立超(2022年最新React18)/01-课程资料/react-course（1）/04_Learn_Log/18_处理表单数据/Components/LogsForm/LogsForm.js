import React from 'react';
import Card from "../UI/Card/Card";
import './LogsForm.css';

const LogsForm = () => {

    /*
    *   当表单项发生变化时，获取用户输入的内容
    * */
    // 创建三个变量，用来存储表单中的数据
    let inputDate = '';
    let inputDesc = '';
    let inputTime = 0;


    // 创建一个响应函数，监听日期的变化
    const dateChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        inputDate = e.target.value;
    };

    // 监听内容的变化
    const descChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        inputDesc = e.target.value;
    };

    //监听时长的变化
    const timeChangeHandler = (e) => {
        // 获取到当前触发事件的对象
        // 事件对象中保存了当前事件触发时的所有信息
        // event.target 执行的是触发事件的对象（DOM对象）
        //console.log(e.target.value);
        inputTime = e.target.value;
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

        console.log(newLog);

    };

    return (
        <Card className="logs-form">
            <form onSubmit={formSubmitHandler}>
                <div className="form-item">
                    <label htmlFor="date">日期</label>
                    <input onChange={dateChangeHandler} id="date" type="date"/>
                </div>
                <div className="form-item">
                    <label htmlFor="desc">内容</label>
                    <input onChange={descChangeHandler} id="desc" type="text"/>
                </div>
                <div className="form-item">
                    <label htmlFor="time">时长</label>
                    <input onChange={timeChangeHandler} id="time" type="number"/>
                </div>
                <div className="form-btn">
                    <button>添加</button>
                </div>
            </form>
        </Card>
    );
};

export default LogsForm;
