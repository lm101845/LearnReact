/**
 * @Author liming
 * @Date 2023/7/17 13:55
 **/
import React from 'react'
import '@/views类组件上下文/Task.less'
import {Button, DatePicker, Form, Input, Modal, Popconfirm, Table, Tag,message} from "antd";
// import {queryList,addTask,removeTask,completeTask} from '@/api'
import {queryList,addTask,removeTask,completeTask} from '../api/index'
import {flushSync} from "react-dom";
// 时间格式化的方法
/**
 * 它接受一个时间字符串和一个模板字符串作为参数。函数的目的是将时间字符串格式化为指定的模板格式。
 *
 * 在这段代码中，正则表达式被用来匹配时间字符串中的数字。具体来说，`time.match(/\d+/g)`会返回一个数组，其中包含时间字符串中的所有数字。
 *
 * 接下来，函数使用模板字符串中的占位符`{0}`、`{1}`、`{2}`、`{3}`、`{4}`和`{5}`来替换数字。`template.replace(/\{(\d+)\}/g, (_, $1) => ...)`会将模板字符串中的占位符替换为对应的数字。其中，`$1`表示正则表达式中的第一个捕获组（即数字的索引），`_`表示整个匹配项。
 *
 * 在替换过程中，如果数字的长度小于2，则会在数字前面添加一个0，以保证格式的一致性。
 * @param time
 * @param template
 * @returns {string}
 */
const formatTime = (time, template = '{0}-{1}-{2} {3}:{4}:{5}') => {
    let arr = time.match(/\d+/g);   //返回一个数组
    return template.replace(/\{(\d+)\}/g, (_, $1) => {
        let item = arr[$1] || '00';
        if (item.length < 2) item = '0' + item;
        return item;
    });
};

// class Task extends React.PureComponent {
class Task extends React.Component {
    //定义表格列的数据(不变，就不放在state里面了)
    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            align: 'center',
            width: '8%'
        },
        {
            title: '任务描述',
            dataIndex: 'task',
            width: '50%'
        },
        {
            title: '状态',
            dataIndex: 'state',
            align: 'center',
            width: '10%',
            render:(text,record)=>{
                // console.log(text,'===>text')
                // console.log(record,'===>record')
                return +text === 1 ? '未完成' :'已完成'
            }
        },
        {
            title: '完成时间',
            dataIndex: 'time',
            align: 'center',
            width: '15%',
            render:(_, record)=>{
                let {state,time,complete} = record
                time = +state === 1 ? time : complete;
                return formatTime(time, '{1}-{2} {3}:{4}');
            }
        },
        {
            title: '操作',
            render: (_, record) => {
                let { id,state} = record;
                return <>
                    <Popconfirm title="您确定要删除此任务吗？" onConfirm={this.handleRemove.bind(null,id)}>
                        <Button type="link">删除</Button>
                    </Popconfirm>

                    {+state === 1 ? <Popconfirm title="您确定要把此任务设置为完成吗？" onConfirm={this.handleUpdate.bind(null,id)} >
                        <Button type="link">完成</Button>
                    </Popconfirm> : null}
                </>;
            }
        }
    ]
    //初始组件的状态
    state = {
        tableData: [],
        tableLoading: false,
        modalVisible:false,
        confirmLoading:false,
        selectedIndex: 0   //默认选择全部
        //原生写法
        // ruleForm:{
        //     task:'',
        //     time:''
        // }
    }

    //对话框和表单处理的方法
    //关门对话框 & 清楚表单的内容
    closeModal = ()=>{
        this.setState({
            modalVisible:false,
            confirmLoading:false,
        })
        this.formIns.resetFields()    //清除表单内容
    }

    //新增任务
    submit = async ()=>{
       try{
           //先做表单校验
           await this.formIns.validateFields()
           // let data = this.formIns.getFieldsValue()
           // console.log(data)
           // message.success('表单校验成功')
           let {task,time} = this.formIns.getFieldsValue()
           console.log(task,time)
           time = time.format('YYYY-MM-DD HH:mm:ss')
           this.setState({confirmLoading:true})
           //向服务器发送请求
           let {code} = await addTask(task,time)
           if(+code !==0){
               message.error("很遗憾，当前操作失败,请稍后再试")
           }else{
               this.closeModal()
               this.queryData()
               message.success("恭喜您,当前操作成功！")
           }
       }catch (_){
           this.setState({confirmLoading:false})

       }
    }

    //关于table数据的处理
    //从服务器获取指定状态的任务
    queryData = async ()=>{
        let {selectedIndex} = this.state
        console.log(selectedIndex,'selectedIndex值是延后的,因为setState是异步的')
        try{
            this.setState({tableLoading:true})
            let {code,list} = await queryList(selectedIndex)
            if(+code !== 0) list = []
            this.setState({
                tableData:list
            })
            // console.log(list,'list')
            this.setState({tableLoading:false})
        }catch (_){
            this.setState({tableLoading:false})
        }
    }

    //选中状态切换
    changeIndex = index =>{
        if(this.state.selectedIndex === index ) return
        // this.setState({
        //     selectedIndex: index
        // },()=>{
        //     //setState是异步的,所以把接口函数写在回调函数里面，才能确保状态真的改了
        //     this.queryData()
        // })

        //或者使用flushSync函数，刷新一下,让操作立马更新
        //写法1：
        // this.setState({ selectedIndex: index})
        // flushSync()
        //写法2：
        flushSync(()=>{
            this.setState({ selectedIndex: index})
        })
        this.queryData()
    }

    //删除
    handleRemove = async id=>{
        try{
            let {code} = await removeTask(id)
            if(+code !== 0){
                message.error("很遗憾，操作失败，请稍后再试！")
            }else{
                this.queryData()
                message.success("恭喜您，操作成功!")
            }
        }catch (_) {

        }
    }

    //完成
    handleUpdate = async id=>{
        try{
            let {code} = await completeTask(id)
            if(+code !== 0){
                message.error("很遗憾，操作失败，请稍后再试！")
            }else{
                this.queryData()
                message.success("恭喜您，操作成功!")
            }
        }catch (_) {

        }
    }

    //周期函数
    // componentWillMount() {    //不安全，其实用这个生命周期更好
    componentDidMount() {
        // console.log(this.formIns,'表单实例')
        //第一次渲染完毕后，立即发送数据请求，获取真实的数据
        this.queryData()
    }

    render() {
        let {tableData, tableLoading,modalVisible,confirmLoading,selectedIndex} = this.state
        return <div className="task-box">
            {/*头部*/}
            <div className="header">
                <div className="title">TASK OA任务管理系统</div>
                <Button type="primary" onClick={()=>{
                    this.setState({
                        modalVisible: true
                    })
                }
                }>新增任务</Button>
            </div>

            {/*标签*/}
            <div className="tag-box">
                {['全部','未完成','已完成'].map((item,index)=>{
                    return <Tag
                        key={index}
                        color={selectedIndex === index ? '#1677ff':''}
                        onClick={this.changeIndex.bind(null,index)}
                    >{item}</Tag>
                })}
                {/*<Tag color="#1677ff">全部</Tag>*/}
                {/*<Tag>未完成</Tag>*/}
                {/*<Tag>已完成</Tag>*/}
            </div>

            {/*表格*/}
            <Table dataSource={tableData}
                   columns={this.columns}
                   loading={tableLoading}
                   pagination={false}
                   rowKey="id">
            </Table>
            {/*对话框 & 表单*/}
            <Modal title="新增任务窗口"
                   open={modalVisible}
                   confirmLoading={confirmLoading}
                   keyboard={false}
                   maskClosable={false}
                   okText="确认提交"
                   onCancel={this.closeModal}
                   onOk={this.submit}
            >
                <Form ref={x=>this.formIns = x} layout = "vertical" initialValues={{
                    task:'',
                    time:''
                }}>
                    <Form.Item
                        label="任务描述"
                        name="task"
                        validateTrigger="onBlur"
                        rules={[
                            {required:true,message:'任务描述必填项'},
                            {min:6,message:'输入的内容至少6位及以上'}
                        ]}>
                        <Input.TextArea rows={4}></Input.TextArea>
                        {/*不需要自己绑定了，用antd自带方法*/}
                        {/*<Input.TextArea rows={4} value={task} onChange={ev=>{*/}
                        {/*    let target = ev.target*/}
                        {/*    let text = target.value.trim()*/}
                        {/*    this.setState({*/}
                        {/*        //不分更改ruleForm中的task*/}
                        {/*        ruleForm:{*/}
                        {/*            ...this.state.ruleForm,   //要先把之前的都拿过来*/}
                        {/*            task:text*/}
                        {/*        }*/}
                        {/*    })*/}
                        {/*    // console.log(this.state.ruleForm,'更改后')*/}
                        {/*}*/}
                        {/*}></Input.TextArea>*/}
                    </Form.Item>

                    <Form.Item label="预期完成时间" name="time"  validateTrigger="onBlur" rules={[ {required:true,message:'预期完成时间是必填项'},]}>
                        <DatePicker showTime></DatePicker>
                        {/*不需要自己绑定了，用antd自带方法*/}
                        {/*<DatePicker showTime value={time} onChange={value=>{*/}
                        {/*    //value获取的是当前选中日期[moment格式的对象],必须绑定moment对象!!!绑其他(如日期字符串)不行！！*/}
                        {/*    // console.log(value.format('YYYY-MM-DD HH:mm:ss'))*/}
                        {/*   this.setState({*/}
                        {/*       ruleForm:{*/}
                        {/*           ...this.state.ruleForm,*/}
                        {/*           time:value*/}
                        {/*       }*/}
                        {/*   })*/}
                        {/*}}></DatePicker>*/}
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    }


}

export default Task
