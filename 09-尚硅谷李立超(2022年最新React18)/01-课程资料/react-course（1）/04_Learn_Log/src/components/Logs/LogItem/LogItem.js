import React, {useState} from 'react';
import MyDate from "./MyDate/MyDate";
import './LogItem.css'
import Card from "../../UI/Card/Card";
import ConfirmModal from "../../UI/ConfirmModal/ConfirmModal";

const LogItem = (props) => {

    // 添加一个state，记录是否显示确认窗口
    const [showConfirm, setShowConfirm] = useState(false);

    // 删除item的响应函数
    const deleteItemHandler = () => {
        // 显示确认窗口
        setShowConfirm(true);
    };

    //取消函数
    const cancelHandler = () => {
        setShowConfirm(false);
    };

    // 确认函数
    const okHandler = () => {
        props.onDelLog();
        setShowConfirm(false);

    };

    /*
    *   portal
    *       - 组件默认会作为父组件的后代渲染到页面中
    *           但是有些情况下，这种方式会带来一些问题
    *       - 通过portal可以将组件渲染到页面中的指定位置
    *       - 使用方法：
    *           1.在index.html添加一个新的元素
    *           2.修改组件的渲染方式
    *               - 通过ReactDOM.createPortal()作为返回值创建元素
    *               - 参数：
    *                   1. jsx（修改前return后的代码）
    *                   2. 目标位置（DOM元素）
    *
    * */

    return (
        <Card className="item">

            {showConfirm && <ConfirmModal
                confirmText="该操作不可恢复！请确认"
                onCancel={cancelHandler}
                onOk={okHandler}
            />}

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

        {/*    添加一个删除按钮*/}
             <div>
                 <div onClick={deleteItemHandler} className='delete'>×</div>
             </div>
        </Card>
    );
};


export default LogItem;
