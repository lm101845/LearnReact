/**
 * @Author liming
 * @Date 2023/9/6 22:15
 **/
import React,{useState,useEffect} from "react";

import {Form, Input, Button, Toast} from 'antd-mobile';
import NavBarAgain from "../components/NavBarAgain";
import ButtonAgain from "../components/ButtonAgain";
import _ from '../assets/utils'
import './Login.less'
import API from '../api'

const Login = () => {
    /*状态*/
    const [formIns] = Form.useForm()
    //组件提供的hook函数，表示Form实例
    // console.log(formIns,'formIns')
    const [disabled,setDisabled] = useState(false)
    const [sendText,setSendText] = useState("发送验证码")

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
            if(+codeHttp !== 0){
                Toast.show({
                    icon:'fail',
                    content:'登录失败'
                })
                formIns.resetFields(['code'])
                return
            }
            //登录成功：存储token、存储用户信息到redux、提示、跳转
            _.storage.set('tk',token)
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


export default Login
