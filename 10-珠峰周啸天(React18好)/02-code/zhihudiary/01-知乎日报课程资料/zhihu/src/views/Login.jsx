import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Input, Button, Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import actions from '../store/actions';
import NavBarAgain from "../components/NavBarAgain";
import API from "../api";
import _ from '../assets/utils';

/* 组件的样式 */
const StyledDiv = styled.div`
    .adm-form {
        padding: 15px;
    }

    .adm-input-element{
        font-size: 14px;
    }

    .adm-form-footer {
        .adm-button {
            display: block;
            margin: 0 auto;
            width: 60%;
            height: 35px;
            font-size: 14px;
            border-radius: 0;
        }
    }

    .adm-form-item {
        font-size: 14px;
    }

    .adm-list-item-content-extra {
        .adm-button {
            width: 100px;
            font-size: 12px;
            border-radius: 0;
        }
    }
`;

/* 表单校验 */
const validator = {
    phone(_, value) {
        value = value.trim();
        if (value.length === 0) return Promise.reject('手机号必填');
        if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) return Promise.reject('手机号格式有误');
        return Promise.resolve();
    },
    code(_, value) {
        value = value.trim();
        if (value.length === 0) return Promise.reject('验证码必填');
        if (!/^\d{6}$/.test(value)) return Promise.reject('验证码格式有误');
        return Promise.resolve();
    }
};

const Login = function Login(props) {
    // 定义状态
    let [formIns] = Form.useForm(),
        [codeText, setCodeText] = useState('发送验证码'),
        [codeLoading, setCodeLoading] = useState(false),
        [codeDisable, setCodeDisable] = useState(false),
        [submitLoading, setSubmitLoading] = useState(false);
    let { queryLoginProfile, navigate, query } = props;

    // 提交表单信息「已经通过校验」
    const submit = async (values) => {
        setSubmitLoading(true);
        try {
            let { phone, code } = values;
            let res = await API.userLogin(phone, code);
            if (+res.code !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '登录失败，请稍后再试~'
                });
                formIns.setFieldValue('code', '');
            } else {
                // 登录成功:存储Token && 存储redux && 提示 && 跳转
                _.storage.set('TK', res.token);
                await queryLoginProfile();
                Toast.show({
                    icon: 'success',
                    content: '登录成功'
                });
                // 校验是否有to的问号传参
                let to = query.get('to');
                to ? navigate(to, { replace: true }) : navigate('/');
            }
        } catch (_) { }
        setSubmitLoading(false);
    };

    // 发送验证码
    let timer = null;
    useEffect(() => {
        return () => {
            // 组件释放后，把定时器也清除掉
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        };
    }, []);
    const countdown = () => {
        setCodeDisable(true);
        setCodeText(`10s后重发`);
        let num = 10;
        if (timer) return;
        timer = setInterval(() => {
            num--;
            if (num === 0) {
                clearInterval(timer);
                timer = null;
                setCodeText(`发送验证码`);
                setCodeDisable(false);
                return;
            }
            setCodeText(`${num}s后重发`);
        }, 1000);
    };
    const sendcode = async () => {
        setCodeLoading(true);
        try {
            await formIns.validateFields(['phone']);
            let phone = formIns.getFieldValue('phone');
            let res = await API.sendPhoneCode(phone);
            if (+res.code !== 0) {
                // 发送失败
                Toast.show({
                    icon: 'fail',
                    content: '发送失败，请稍后再试~'
                });
            } else {
                // 发送成功:开启倒计时
                countdown();
            }
        } catch (_) { }
        setCodeLoading(false);
    };

    return <StyledDiv>
        <NavBarAgain title="登录/注册" />
        <Form
            layout='horizontal'
            style={{ '--border-top': 'none', '--border-bottom': 'none' }}
            footer={
                <Button color='primary' type="submit" loading={submitLoading}>
                    提交
                </Button>
            }
            initialValues={{ phone: '', code: '' }}
            onFinish={submit}
            form={formIns}
        >
            <Form.Item name='phone' label='手机号' rules={[{ validator: validator.phone }]}>
                <Input placeholder='请输入手机号' />
            </Form.Item>

            <Form.Item name='code' label='验证码' rules={[{ validator: validator.code }]}
                extra={
                    <Button size='small'
                        color='primary'
                        loading={codeLoading}
                        disabled={codeDisable}
                        onClick={sendcode}>
                        {codeText}
                    </Button>
                }
            >
                <Input />
            </Form.Item>
        </Form>
    </StyledDiv>;
};
export default connect(null, actions.base)(Login);