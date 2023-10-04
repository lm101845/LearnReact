/**
 * @Author liming
 * @Date 2023/9/6 22:15
 **/
import React, {useState, useEffect} from "react";

import {Form, Input, Button, Toast} from 'antd-mobile';
import {connect} from 'react-redux'
import action from '../store/action'
import NavBarAgain from "../components/NavBarAgain";
import ButtonAgain from "../components/ButtonAgain";
import _ from '../assets/utils'
import './Login.less'
import API from '../api'

const Login = (props) => {
    // console.log(props,'Login中的props')
    let {queryUserInfoAsync, navigate, usp} = props

    /*状态*/
    const [formIns] = Form.useForm()
    //组件提供的hook函数，表示Form实例
    // console.log(formIns,'formIns')
    const [disabled, setDisabled] = useState(false)
    const [sendText, setSendText] = useState("发送验证码")

    /*表单提交*/
    // const submit = (values) => {
    //     //onFinish:提交表单且数据验证成功后触发
    //     //能执行这个方法，说明表单校验已经成功了
    //     //values:Form自动收集的表单信息
    //     console.log(values, '各个表单中手机的信息')
    //     Toast.show({
    //         icon: 'success',
    //         content: '整体校验成功'
    //     });
    // }
    const submit = async ()=>{
        try{
            await formIns.validateFields(['phone'])   //规则校验
            // await delay(3000)
            let {phone,code} = formIns.getFieldsValue()
            let {code:codeHttp,token} = await API.userLogin(phone,code)
            if (+codeHttp !== 0) {
                Toast.show({
                    icon: 'fail',
                    content: '登录失败'
                })
                formIns.resetFields(['code'])
                return
            }
            //登录成功：存储token、存储用户信息到redux、提示、跳转
            _.storage.set('tk', token)
            await queryUserInfoAsync()   //派发任务，同步redux中的信息
            Toast.show({
                icon: 'success',
                content: '登录/注册成功'
            })
            let to = usp.get('to')
            to ? navigate(to, {replace: true}) : navigate(-1)
            navigate(-1)
        }catch (_){}
    }

    // const delay = (interval=1000)=>{
    //     return new Promise(resolve => {
    //         setTimeout(()=>{
    //             resolve()
    //         },interval)
    //     })
    // }

    /*发送验证码*/
    let timer = null
    let num = 31
    const countdown = ()=>{
        num--
        if(num === 0){
            clearInterval(timer)
            timer = null
            setSendText('发送验证码')
            setDisabled(false)
            return
        }
        setSendText(`${num}秒后重发`)
    }

    const send = async () => {
        // console.log('send函数执行了')
        try {
            // await formIns.validateFields('phone')   //要写成数组！！
            // console.log('手机号校验之前')
            await formIns.validateFields(['phone'])
            // console.log('手机号校验以后')
            //手机号格式校验通过
            // Toast.show({
            //     icon: 'success',
            //     content: '手机号校验成功',
            //     // duration:0
            // });
            // await delay(3000)
            let phone = formIns.getFieldValue('phone')
            let {code} = await API.sendPhoneCode(phone)
            console.log(code,'打印code')
            if(+code !== 0){
                Toast.show({
                    icon:'fail',
                    content:'发送失败'
                })
                return;
            }
            //发送成功
            setDisabled(true)
            countdown()
            if(!timer){
                timer = setInterval(countdown,1000)
            }
        } catch (_) {
        }
    }

    /* 自定义表单校验规则 */
    const validator = {
        phone(_, value) {
            value = value.trim();
            if (value.length === 0) return Promise.reject('手机号必填');
            if (!/^(?:(?:\+|00)86)?1\d{10}$/.test(value)) return Promise.reject('手机号格式有误');
            /**
             * 这个正则表达式用于匹配中国的手机号码。解释如下：
             *
             * * `^` 表示字符串的开始。
             * * `(?:\+|00)86` 是一个非捕获组，匹配`+86`或者`0086`。这是国际电话区号，其中`+`表示直接拨打，`00`表示通过某些特定的网络（例如某些VPN）拨打。
             * * `?` 表示前面的组是可选的，也就是说前面的`(?:\+|00)86`是可选的，可以不出现。
             * * `1\d{10}` 匹配的是手机号码的主体部分。`1`是手机号码的第一位数字，必须是1。`\d{10}`匹配随后的10个数字，也就是手机号码的剩余部分。
             * * `$` 表示字符串的结束。
             *
             * 所以，这个正则表达式可以匹配以`+86`或`0086`开头（但不是必须的）并且总共11位数字的手机号码。
             */
            return Promise.resolve();
        },
        code(_, value) {
            value = value.trim();
            if (value.length === 0) return Promise.reject('验证码必填');
            if (!/^\d{6}$/.test(value)) return Promise.reject('验证码格式有误');
            return Promise.resolve();
        }
    };

    //组件销毁后，把没有清除的定时器干掉
    useEffect(()=>{
        return ()=>{
            if(timer){
                clearInterval(timer)
                timer = null
            }
        }
    },[])
    return <div className="login-box">
        <NavBarAgain title="登录/注册"/>
        <Form
            layout='horizontal'
            style={{'--border-top': 'none', '--border-bottom': 'none'}}
            footer={
            // <Button color='primary' type="submit" loading={submitLoading}>提交</Button>
                <ButtonAgain  color='primary' onClick={submit}>提交</ButtonAgain>
            }
            // onFinish={submit}
            // 使用了自定义组件，就不能用这个方法提交了，否则就没有loading效果了
            form={formIns}
            initialValues={{phone: '', code: ''}}
        >
            <Form.Item name='phone' label='手机号' rules={[{validator: validator.phone}]}>
                <Input placeholder='请输入手机号'/>
            </Form.Item>


            <Form.Item
                name='code'
                label='验证码'
                rules={[{validator: validator.code}]}
                extra={<ButtonAgain size='small' color='primary' disabled={disabled} onClick={send}>{sendText}</ButtonAgain>}>
                <Input/>
            </Form.Item>
            {/*
             写法2
            // rules={[
            //     {required:true,message:'验证码是必填项'},
            //     {pattern:/^d{6}$/,message:'验证码格式有误!!!'}
            // ]}
            */}
        </Form>
    </div>;
};


export default connect(null, action.base)(Login)

/**
 * connect函数在react-redux库中是一个非常重要的函数，其主要作用是将React组件与Redux store连接起来。
 * 具体来说，connect函数会创建一个容器组件，该组件会订阅Redux store的状态变化，并将这些状态变化作为props传递给被包裹的React组件。
 *
 * connect函数接收两个参数：mapStateToProps和mapDispatchToProps。
 *
 * mapStateToProps是一个函数，它接收当前的Redux store的state作为参数，并返回一个对象，
 * 这个对象的属性将作为props传递给被包裹的React组件。
 * mapDispatchToProps也是一个函数，它接收dispatch作为参数，并返回一个对象，这个对象的属性将作为props传递给被包裹的React组件。
 * mapDispatchToProps可以帮助你将Redux的action creators转化为props，
 * 这样你就可以在React组件中通过props直接调用这些action creators。
 *
 * 使用connect函数的好处是，它使得React组件与Redux store的状态更新保持同步，
 * 同时也使得React组件可以方便地调用Redux的action creators。
 */
