import { useState} from "react";
import { Button, Tag, Table, Modal, Form, Input, DatePicker, Popconfirm } from 'antd';
import './Task.less';

// 日期格式化
const formatTime = function formatTime(time, template) {
    if (typeof template !== "string") template = "{0}年{1}月{2}日 {3}:{4}:{5}";
    let arr = time.match(/\d+/g);
    return template.replace(/\{(\d+)\}/g, (_, $1) => {
        let item = arr[$1] || "00";
        if (item.length < 2) item = "0" + item;
        return item;
    });
};

const Task = function Task() {
    /* 表格列 */
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
            if (+state === 2) time = complete;
            return formatTime(time, '{1}-{2} {3}:{4}');
        }
    }, {
        title: '操作',
        render: (_, record) => {
            let { id, state } = record;
            return <>
                <Popconfirm title="您确定要删除此任务吗?">
                    <Button type="link">删除</Button>
                </Popconfirm>
                {+state !== 2 ? <Popconfirm title="您确定要修改此任务吗?">
                    <Button type="link">完成</Button>
                </Popconfirm> : null}
            </>;
        }
    }];

    return <div className="task-box">
        <header className="head-box">
            <h2 className="title">TASK OA 任务管理系统</h2>
            <Button type="primary">
                新增任务
            </Button>
        </header>

        <section className="tag-box">
            <Tag color="#108ee9">全部</Tag>
            <Tag>未完成</Tag>
            <Tag>已完成</Tag>
        </section>

        <Table pagination={false}
            rowKey="id"
            columns={columns}
            dataSource={[]}
            loading={false} />

        <Modal keyboard={false} maskClosable={false} okText="提交信息" title="新增任务窗口"
            confirmLoading={false}
            visible={false}>
            <Form layout="vertical"
                initialValues={{ task: '', time: '' }}>
                <Form.Item label="任务描述" name="task" validateTrigger="onBlur"
                    rules={[{ required: true, pattern: /^[\w\W]{6,}$/, message: '内容为必填且不少于6位!' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="任务预期完成时间" name="time" validateTrigger="onBlur"
                    rules={[{ required: true, message: '完成时间是必填项!' }]}>
                    <DatePicker showTime />
                </Form.Item>
            </Form>
        </Modal>
    </div>;
};

export default Task;