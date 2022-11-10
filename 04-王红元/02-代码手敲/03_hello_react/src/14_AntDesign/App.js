/**
 * @Author liming
 * @Date 2022/11/10 17:56
 **/

import React, {PureComponent} from 'react';
import { Button,DatePicker } from 'antd';
import {PoweroffOutlined} from "@ant-design/icons";
import moment from 'moment';
export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    render() {
        const loadings = true
        return (
            <>
                <Button type="primary" loading>
                    Loading
                </Button>
                <Button type="primary" size="small" loading>
                    Loading
                </Button>
                <Button type="primary" icon={<PoweroffOutlined />} loading />
                <br />
                <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
                    Click me!
                </Button>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    loading={loadings[1]}
                    onClick={() => this.enterLoading(1)}
                >
                    Click me!
                </Button>
                <Button
                    type="primary"
                    icon={<PoweroffOutlined />}
                    loading={loadings[2]}
                    onClick={() => this.enterLoading(2)}
                />
                <DatePicker defaultValue={moment('2015-06-06', "YYYY-MM-DD")}
                            allowClear={false}/>
            </>
        );
    }
}
