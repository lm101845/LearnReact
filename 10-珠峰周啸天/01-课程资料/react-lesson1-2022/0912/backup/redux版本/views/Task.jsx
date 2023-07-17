import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag, message } from 'antd';
import api from '@/api';
import './Task.less';
import { connect } from 'react-redux';
import actions from '@/store/actions';

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
            let { state, id } = record;
            return <>
                <Popconfirm title="您确定要删除此任务吗？"
                    onConfirm={removeHandler.bind(null, id)}>
                    <Button type="link">删除</Button>
                </Popconfirm>

                {+state === 1 ? <Popconfirm title="您确定要把此任务设置为完成吗？"
                    onConfirm={updateHandler.bind(null, id)}>
                    <Button type="link">完成</Button>
                </Popconfirm> : null}
            </>;
        }
    }];

    /* 定义状态 */
    let [tableData, setTableData] = useState([]),
        [loading, setLoading] = useState(false),
        [selected, setSelected] = useState(0),
        [visible, setVisible] = useState(false),
        [confirmLoading, setConfirmLoading] = useState(false),
        [formIns] = Form.useForm();
    let { list, getTaskList, getTaskListThunk, removeTask, completeTask } = props;

    /* 获取数据 */
    useEffect(() => {
        const init = async () => {
            // 判断公共状态是否存在：不存在则完成异步派发
            if (!list) {
                setLoading(true);
                await getTaskList();
                setLoading(false);
                return;
            }
            // 存在则筛选想要的数据给TABLE
            let temp = list;
            if (selected !== 0) {
                temp = temp.filter(item => {
                    return +item.state === selected;
                });
            }
            setTableData(temp);
        };
        init();
    }, [selected, list]);

    /* 页卡切换 */
    const changeTabHandler = (index) => {
        if (selected === index) return;
        setSelected(index);
    };

    /* 关闭Modal && 提交信息  */
    const cancelHandler = () => {
        setVisible(false);
        setConfirmLoading(false);
        formIns.resetFields();
    };
    const submitHandler = async () => {
        try {
            await formIns.validateFields();
            // 向服务器提交数据
            setConfirmLoading(true);
            let { task, time } = formIns.getFieldsValue();
            time = time.format('YYYY-MM-DD HH:mm:ss');
            let { code } = await api.addTask({
                task,
                time
            });
            if (+code !== 0) {
                message.error('很遗憾，当前操作失败~');
            } else {
                message.success('恭喜您，当前操作成功~');
                cancelHandler();
                // 异步派发
                setLoading(true);
                await getTaskListThunk();
                setLoading(false);
            }
        } catch (_) { }
        setConfirmLoading(false);
    };

    /* 删除 && 完成 */
    const removeHandler = async (id) => {
        try {
            let { code } = await api.removeTask(id);
            if (+code !== 0) {
                message.error('很遗憾，当前操作失败~');
                return;
            }
            message.success('恭喜您，当前操作成功~');
            // 同步派发 
            removeTask(id);
        } catch (_) { }
    };
    const updateHandler = async (id) => {
        try {
            let { code } = await api.completeTask(id);
            if (+code !== 0) {
                message.error('很遗憾，当前操作失败~');
                return;
            }
            message.success('恭喜您，当前操作成功~');
            // 同步派发 
            completeTask(id);
        } catch (_) { }
    };

    return <div className="task-box">
        <header className="head-box">
            <h2 className="title">TASK OA 任务管理系统</h2>
            <Button type="primary"
                onClick={() => setVisible(true)}>
                新增任务
            </Button>
        </header>

        <section className="tag-box">
            {['全部', '未完成', '已完成'].map((item, index) => {
                return <Tag key={index}
                    color={selected === index ? '#108ee9' : ''}
                    onClick={changeTabHandler.bind(null, index)}>
                    {item}
                </Tag>;
            })}
        </section>

        <Table pagination={false} rowKey="id"
            loading={loading}
            dataSource={tableData}
            columns={columns} />

        <Modal title="新增任务窗口" okText="提交信息" maskClosable={false} keyboard={false}
            visible={visible}
            confirmLoading={confirmLoading}
            onCancel={cancelHandler}
            onOk={submitHandler}>
            <Form layout="vertical"
                form={formIns}
                initialValues={{ task: '', time: '' }}>
                <Form.Item label="任务描述" name="task" validateTrigger="onBlur"
                    rules={[{ required: true, pattern: /^[\w\W]{6,}$/, message: '任务描述必须在6位以上~' }]}>
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="任务预期完成时间" name="time" validateTrigger="onBlur"
                    rules={[{ required: true, message: '任务完成时间是必填项~' }]}>
                    <DatePicker showTime />
                </Form.Item>
            </Form>
        </Modal>
    </div>;
};

export default connect(
    state => state.task,
    actions.task
)(Task);