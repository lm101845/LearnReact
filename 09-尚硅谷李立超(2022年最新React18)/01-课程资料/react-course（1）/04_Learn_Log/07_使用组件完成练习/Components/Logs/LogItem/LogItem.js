import React from 'react';
import MyDate from "./MyDate/MyDate";
import './LogItem.css'

const LogItem = () => {
    return (
        <div className="item">
            <MyDate/>
            {/* 日志内容的容器 */}
            <div className="content">
                <h2 className="desc">学习React</h2>
                <div className="time">40分钟</div>
            </div>
        </div>
    );
};

export default LogItem;
