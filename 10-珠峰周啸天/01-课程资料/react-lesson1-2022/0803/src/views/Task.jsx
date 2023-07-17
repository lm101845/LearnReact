import React from "react";
import { Button, Popconfirm, Table, Tag } from 'antd';
import './Task.less';

// 模拟假数据
const data = [{
    id: 1,
    task: '我是任务的描述信息',
    state: 1,
    time: '2022-08-05 12:00:00',
    complete: '2022-08-05 12:00:00'
}, {
    id: 2,
    task: '我是已经完成的任务',
    state: 2,
    time: '2022-08-05 12:00:00',
    complete: '2022-08-03 12:00:00'
}];

// 时间格式化的方法
const formatTime = (time, template = '{0}-{1}-{2} {3}:{4}:{5}') => {
    let arr = time.match(/\d+/g);
    return template.replace(/\{(\d+)\}/g, (_, $1) => {
        let item = arr[$1] || '00';
        if (item.length < 2) item = '0' + item;
        return item;
    });
};

const Task = function Task(props) {
    /* 定义表格列 */
    const columns = [{
        title: '编号',
        dataIndex: 'id',
        align: 'center',
        width: '8%'
    }, {
        title: '任务描述',
        dataIndex: 'task',
        width: '50%'
    }, {
        title: '状态',
        dataIndex: 'state',
        align: 'center',
        width: '10%',
        render: text => +text === 1 ? '未完成' : '已完成'
    }, {
        title: '完成时间',
        dataIndex: 'time',
        align: 'center',
        width: '15%',
        render: (_, record) => {
            let { state, time, complete } = record;
            time = +state === 1 ? time : complete;
            return formatTime(time, '{1}-{2} {3}:{4}');
        }
    }, {
        title: '操作',
        render: (_, record) => {
            let { state } = record;
            return <>
                <Popconfirm title="您确定要删除此任务吗？">
                    <Button type="link">删除</Button>
                </Popconfirm>

                {+state === 1 ? <Popconfirm title="您确定要把此任务设置为完成吗？">
                    <Button type="link">完成</Button>
                </Popconfirm> : null}
            </>;
        }
    }];

    return <div className="task-box">
        <header className="head-box">
            <h2 className="title">TASK OA 任务管理系统</h2>
            <Button type="primary">新增任务</Button>
        </header>

        <section className="tag-box">
            <Tag color="#108ee9">全部</Tag>
            <Tag>未完成</Tag>
            <Tag>已完成</Tag>
        </section>

        <Table pagination={false} rowKey="id" loading={false} dataSource={data} columns={columns} />
    </div>;
};

export default Task;