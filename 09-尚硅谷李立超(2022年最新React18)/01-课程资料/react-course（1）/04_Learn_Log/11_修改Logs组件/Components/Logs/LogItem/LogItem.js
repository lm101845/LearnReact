import React from 'react';
import MyDate from "./MyDate/MyDate";
import './LogItem.css'

const LogItem = (props) => {

    /*
    *   props是只读的不能修改
    * */
    // props.desc = '嘻嘻'; // 不能修改props中的属性
    // console.log(props.desc);


    return (
        <div className="item">
            <MyDate date={props.date}/>
            {/* 日志内容的容器 */}
            <div className="content">
                {/*
                  如果将组件中的数据全部写死，将会导致组件无法动态设置，不具有使用价值
                    我们希望组件数据可以由外部设置，在组件间，父组件可以通过props（属性）向子组件传递数据
                */}
                <h2 className="desc">{props.desc}</h2>
                <div className="time">{props.time}分钟</div>
            </div>
        </div>
    );
};


export default LogItem;
