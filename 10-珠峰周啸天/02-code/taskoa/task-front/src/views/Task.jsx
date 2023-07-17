/**
 * @Author liming
 * @Date 2023/7/17 13:55
 **/
import React from 'react'
import './Task.less'
import {Button, Popconfirm, Table, Tag} from "antd";

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

/* 删除 && 完成 */
// const removeHandler = async (id) => {
//     try {
//         let { code } = await api.removeTask(id);
//         if (+code !== 0) {
//             message.error('很遗憾，当前操作失败~');
//             return;
//         }
//         message.success('恭喜您，当前操作成功~');
//         dispatch(removeTask(id));
//     } catch (_) { }
// };
// const updateHandler = async (id) => {
//     try {
//         let { code } = await api.completeTask(id);
//         if (+code !== 0) {
//             message.error('很遗憾，当前操作失败~');
//             return;
//         }
//         message.success('恭喜您，当前操作成功~');
//         dispatch(completeTask(id));
//     } catch (_) { }
// };

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
                console.log(text,'===>text')
                console.log(record,'===>record')
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
                let { state, id } = record;
                return <>
                    <Popconfirm title="您确定要删除此任务吗？">
                        <Button type="link">删除</Button>
                    </Popconfirm>

                    {+state === 1 ? <Popconfirm title="您确定要把此任务设置为完成吗？">
                        <Button type="link">完成</Button>
                    </Popconfirm> : null}
                </>;
            }
        }
    ]
    //初始组件的状态
    state = {
        tableData: [],
        tableLoading: false
    }

    render() {
        let {tableData, tableLoading} = this.state
        return <div className="task-box">
            {/*头部*/}
            <div className="header">
                <div className="title">TASK OA任务管理系统</div>
                <Button type="primary">新增任务</Button>
            </div>

            {/*标签*/}
            <div className="tag-box">
                <Tag color="#1677ff">全部</Tag>
                <Tag>未完成</Tag>
                <Tag>已完成</Tag>
            </div>

            {/*表格*/}
            <Table dataSource={tableData}
                   columns={this.columns}
                   loading={tableLoading}
                   pagination={false}
                   rowKey="id">
            </Table>
            {/*对话框 & 表单*/}


        </div>
    }
}

export default Task
