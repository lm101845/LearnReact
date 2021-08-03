import React, {Component} from 'react';
import {version, Button, Icon} from 'antd'
import { Layout } from 'antd';
import { Menu, Dropdown } from 'antd';
import { Pagination } from 'antd';
import { Steps} from 'antd';
import { DatePicker } from 'antd';
import "antd/dist/antd.css"

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const {
    Header, Footer, Sider, Content,
} = Layout;

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">Web学科</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">Java学科</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">Python学科</a>
        </Menu.Item>
    </Menu>
);

const Step = Steps.Step;

function onChange(date, dateString) {
    console.log(date, dateString);
}

class AntOne extends Component {
    render() {
        return (
            <div>
                <p>Ant Design的当前版本：{version}</p>
                <Button type="danger">百度一下</Button>
                <br/>
                <br/>
                <Button type="dashed">百度一下</Button>
                <br/>
                <br/>
                <Button type="dashed" icon="download" shape="circle" size="small"/>
                <br/>
                <br/>
                <Button.Group size="large">
                    <Button type="primary">
                        <Icon type="left"/>返回
                    </Button>
                    <Button type="primary">
                        前进<Icon type="right"/>
                    </Button>
                </Button.Group>
                <br/>
                <br/>
                {/*<div>
                    <Layout>
                        <Header>Header</Header>
                        <Content>Content</Content>
                        <Footer>Footer</Footer>
                    </Layout>

                    <Layout>
                        <Header>Header</Header>
                        <Layout>
                            <Sider>Sider</Sider>
                            <Content>Content</Content>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>

                    <Layout>
                        <Header>Header</Header>
                        <Layout>
                            <Content>Content</Content>
                            <Sider>Sider</Sider>
                        </Layout>
                        <Footer>Footer</Footer>
                    </Layout>

                    <Layout>
                        <Sider>Sider</Sider>
                        <Layout>
                            <Header>Header</Header>
                            <Content>Content</Content>
                            <Footer>Footer</Footer>
                        </Layout>
                    </Layout>
                </div>*/}
                <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                        进啦 <Icon type="down" />
                    </a>
                </Dropdown>
                <br/>
                <br/>
                <Pagination defaultCurrent={1} total={50} />
                <br/>
                <br/>
                <Pagination defaultCurrent={6} total={500} />
                <br/>
                <br/>
                <Steps>
                    <Step status="finish" title="登录" icon={<Icon type="user" />} />
                    <Step status="finish" title="验证" icon={<Icon type="solution" />} />
                    <Step status="process" title="支付" icon={<Icon type="loading" />} />
                    <Step status="wait" title="完成" icon={<Icon type="smile-o" />} />
                </Steps>
                <br/>
                <br/>
                <div>
                    <DatePicker onChange={onChange} />
                    <br />
                    <MonthPicker onChange={onChange} placeholder="选择月份" />
                    <br />
                    <RangePicker onChange={onChange} />
                    <br />
                    <WeekPicker onChange={onChange} placeholder="选择日期" />
                </div>
            </div>
        );
    }
}

export default AntOne;
