/**
 * @Author liming
 * @Date 2023/7/17 13:55
 **/
import React, {useState, useEffect, useRef} from 'react'
import './Task.less'
import {Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag, message} from "antd";
import {queryList, addTask, removeTask, completeTask} from '../api'
import {flushSync} from "react-dom";
import {connect} from 'react-redux'
import action from '@/store/actions'
// 时间格式化的方法

const formatTime = (time, template = '{0}-{1}-{2} {3}:{4}:{5}') => {
    let arr = time.match(/\d+/g);   //返回一个数组
    return template.replace(/\{(\d+)\}/g, (_, $1) => {
        let item = arr[$1] || '00';
        if (item.length < 2) item = '0' + item;
        return item;
    });
};

const Task = (props) => {
    console.log(props,'传递props')
    //获取基于属性传递进来的公共状态 & ActionCreator
    let {taskList,queryAllList,deleteTaskById,updateTaskById} = props

    //定义表格列的数据(不变，就不放在state里面了)
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
            align: 'center',
            width: '8%'
        },
        {
            title: '任务描述',
            dataIndex: 'task',
            ellipsis: true,
            width: '50%'
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
            width: '10%',
            render: text => {
                return +text === 1 ? '未完成' : '已完成'
            }
        },
        {
            title: '完成时间',
            dataIndex: 'time',
            align: 'center',
            width: '15%',
            render: (_, record) => {
                let {state, time, complete} = record
                time = +state === 1 ? time : complete;
                return formatTime(time, '{1}-{2} {3}:{4}');
            }
        },
        {
            title: '操作',
            render: (_, record) => {
                let {id, state} = record;
                return <>
                    <Popconfirm title="您确定要删除此任务吗？" onConfirm={removeHandle.bind(null,id)}>
                        <Button type="link">删除</Button>
                    </Popconfirm>

                    {+state === 1 ? <Popconfirm title="您确定要把此任务设置为完成吗？" onConfirm={updateHandle.bind(null,id)}>
                        <Button type="link">完成</Button>
                    </Popconfirm> : null}
                </>;
            }
        }
    ]

    //定义需要的状态
    let [selectedIndex, setSelectedIndex] = useState(0)
    let [tableData, setTableData] = useState([])
    let [tableLoading, setTableLoading] = useState(false)
    let [modalVisible, setModalVisible] = useState(false)
    let [confirmLoading, setConfirmLoading] = useState(false)
    let formIns = useRef(null)    //方法1
    let [formIns1] = Form.useForm()   //方法2:这是antd自己提供的，且只能在函数式组件里面用

    //关于table和数据的处理
    //第一次渲染完毕，判断redux是否有公共状态(全部任务)。如果没有，则进行异步的派发
    useEffect(()=>{
        // if(!taskList){
        //     // setTableLoading(true)
        //     console.log(queryAllList())   //返回结果是promise<pending>
        // }

        //useEffect里面不能直接写async
        (async ()=>{
            if(!taskList){
                setTableLoading(true)
                await queryAllList()
                setTableLoading(false)
            }
        })()
    },[])

    //依赖于redux中的全部任务 & 选中的状态信息，从全部任务中，筛选出表格需要的数据
    useEffect(()=>{
        if(!taskList){
            setTableData([])
            return
        }
        if(selectedIndex !== 0){
            taskList = taskList.filter(item=>+item.state === +selectedIndex)
        }
        setTableData(taskList)
    },[taskList,selectedIndex])

    // const query = async ()=>{
    //     setTableLoading(true)
    //     try{
    //         let {code,list} = await queryList(selectedIndex)
    //         // console.log(code,list)
    //         if(+code !== 0) list = []
    //         setTableData(list)
    //         setTableLoading(false)
    //     }catch (_){
    //         setTableLoading(false)
    //     }
    // }

    //等价与componentDidMount + selectedIndex改变后也去执行这个query方法
    // useEffect(()=>{
    //     query()
    // },[selectedIndex])

    //关于Modal和表单的处理方法(没有this了)
    const closeModal = () => {
        setModalVisible(false)
        setConfirmLoading(false)
        formIns1.resetFields()
    }
    const submit = async () => {
        //先进行表单校验
        console.log(formIns.current)
        // console.log(formIns1)
        try {
            //写法1：通用
            // await formIns.current.validateFields()
            // let {task,time} = formIns.current.getFieldValue()
            //写法2：antd提供
            await formIns1.validateFields()
            let {task,time} = formIns1.getFieldValue()
            console.log(task,'==》task',time,'==>time')
            time = time.format('YYYY-MM-DD HH:mm:ss')
            //表单校验通过，向服务器发送请求
            setConfirmLoading(true)
            let {code} = await addTask(task,time)
            console.log(code,'code')
            if(+code !==0){
                message.error("很遗憾，当前操作失败,请稍后再试")
            }else{
                closeModal()
                // query()
                queryAllList()   //派发任务，获取全部任务信息，同步到redux中
                message.success("恭喜您,当前操作成功！")
            }
        }catch (_){
            setConfirmLoading(false)
        }
    }

    // let formIns;

    //关于删除和完成的操作
    const removeHandle = async id=>{
        try{
            let {code} = await removeTask(id)
            if(+code !== 0){
                message.error("很遗憾，操作失败，请稍后再试！")
            }else{
                // query()
                deleteTaskById(id)  //派发任务，删除redux中的数据
                message.success("恭喜您，操作成功!")
            }
        }catch (_){

        }
    }
    const updateHandle = async id=>{
        try{
            let {code} = await completeTask(id)
            if(+code !== 0){
                message.error("很遗憾，操作失败，请稍后再试！")
            }else{
                // query()
                updateTaskById(id)  //派发任务，修改redux中的数据
                message.success("恭喜您，操作成功!")
            }
        }catch (_){

        }
    }
    return <div className="task-box">
        {/*头部*/}
        <div className="header">
            <div className="title">TASK OA任务管理系统</div>
            <Button type="primary" onClick={() => {
                setModalVisible(true)
            }}>新增任务</Button>
        </div>

        {/*标签*/}
        <div className="tag-box">
            {['全部', '未完成', '已完成'].map((item, index) => {
                return <Tag
                    key={index}
                    color={index === selectedIndex ? '#1677ff' : ''}
                    onClick={() => {
                        // if(index === selectedIndex) return
                        // if判断(点击这项就是当前选中项，可以啥都不处理)可以不加，React内部优化了
                        setSelectedIndex(index)
                        //但这个是异步的，下面执行执行query,index还没执行呢
                        // flushSync(()=>{
                        // query()
                        // })
                        // 函数式组件使用flushSync不行！！！！拿的还是旧的闭包里面的index值
                    }}>
                    {item}
                </Tag>
            })}
        </div>

        {/*表格*/}
        <Table dataSource={tableData}
               columns={columns}
               loading={tableLoading}
               pagination={false}
               rowKey="id">
            {/*rowKey表示把从服务器传过来的哪一个字段作为参考的唯一值*/}
        </Table>

        {/*对话框 & 表单*/}
        <Modal title="新增任务窗口"
               open={modalVisible}
               confirmLoading={confirmLoading}
               keyboard={false}
               maskClosable={false}
               okText="确认提交"
               onCancel={closeModal}
               onOk={submit}
        >
            <Form layout="vertical"
                  validateTrigger="onBlur"
                  ref={formIns}
                  form={formIns1}
                  initialValues={{
                      task: '',
                      time: ''
                  }}>
                <Form.Item
                    label="任务描述"
                    name="task"
                    rules={[
                        {required: true, message: '任务描述必填项'},
                        {min: 6, message: '输入的内容至少6位及以上'}
                    ]}>
                    <Input.TextArea rows={4}></Input.TextArea>
                </Form.Item>

                <Form.Item label="预期完成时间" name="time"
                           rules={[{required: true, message: '预期完成时间是必填项'},]}>
                    <DatePicker showTime></DatePicker>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

export default connect(state=>state.task,action.task)(Task)
