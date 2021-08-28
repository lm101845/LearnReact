import React, { Component } from 'react'
import { Button,DatePicker } from 'antd';
// 人家没把图标放在了antd库里面，人家放在了子库里面
import { WechatOutlined,WeiboOutlined,SearchOutlined}  from '@ant-design/icons'
// 这里的样式要单独引入
// 这里的.css不能省略
// 在脚手架里能省略的后缀名还有2个：.js和.jsx
// import 'antd/dist/antd.css'
// 你这样引入样式，就是把antd里面的所有组件的所有样式都引入进来了
const { RangePicker } = DatePicker;
export default class App extends Component {
    render() {
        return (
            <div>
                App...
                <button>按钮1</button>
                <Button type="primary">按钮2</Button>
                <Button type='ghost'>按钮3</Button>
                <Button type='text'>按钮4</Button> 
                <hr />
                <WechatOutlined />&nbsp;
                <WeiboOutlined /><hr />
                    <Button type="primary" icon={<SearchOutlined />}>
                        Search
                </Button>
                <hr />
                <DatePicker />
                <hr />
                  <RangePicker />
            </div>
        )
    }
}
