/**
 * @Author liming
 * @Date 2022/11/12 9:11
 **/

import React, {PureComponent} from 'react';
import axios from 'axios'

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        //拿到数据
        // this.setState({
        //     products:[...this.state.products,...res]
        // })

        //1.axios发送基本的网络请求
        //get请求的3种写法
        //写法1
        // axios({
        //     url: "https://httpbin.org/get",
        //     params: {
        //         name: "why",
        //         age: 18
        //     }
        // }).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
        // //写法2
        // axios.get("https://httpbin.org/get", {
        //     params: {
        //         name: "why",
        //         age: 18
        //     }
        // }).then(res => {
        //     console.log(res, 'get请求2')
        // })
        //写法3:使用async await，一定要和try...catch联合使用
        try {
            const result = await axios.get("https://httpbin.org/get", {
                params: {
                    name: "why",
                    age: 18
                }
            })
            console.log(result, 'get请求')
        } catch (err) {
            console.log(err)
        }

        //post请求的3种写法
        //写法1
        // axios({
        //     url: "https://httpbin.org/post",
        //     method: 'post',
        //     data: {
        //         name: "cobe",
        //         age: 40
        //     }
        // }).then(res => {
        //     console.log(res)
        // }).catch(err => {
        //     console.log(err)
        // })
        // //写法2
        // axios.post("https://httpbin.org/post", {
        //     name: "cobe",
        //     age: 40
        // }).then(res => {
        //     console.log(res, 'post请求2')
        // })

        //写法3
        try {
            const result2 = await axios.post("https://httpbin.org/post", {
                name: "cobe",
                age: 40
            })
            console.log(result2, 'post请求')
        } catch (err) {
            console.log(err)
        }

        //axios.all：将2个请求进行合并
        const request1 = axios({
            url: "https://httpbin.org/get",
            params: {
                name: "why",
                age: 18
            }
        })

        const request2 = axios({
            url: "https://httpbin.org/post",
            method: 'post',
            data: {
                name: "cobe",
                age: 40
            }
        })
        axios.all([request1,request2]).then(([res1,res2])=>{
            console.log(res1,res2,'axios.all方法')}
        ).catch(err=>{
            console.log(err)
        })

        //创建新的实例(比如公司有多台服务器，创建不同实例，分别向不同服务器发送请求)
        const instance1 = axios.create({
            baseURL:"http://baidu.xyz",
            timeout:10000,
            headers:{

            }
        });

        //拦截器(发送请求之前，对该请求进行拦截)
        axios({
            url: "https://httpbin.org/post",
            method: 'post',
            data: {
                name: "cobe",
                age: 40
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
        axios.interceptors.request.use(config=>{
            //拦截的时候，可以拿到所有的配置信息
            //1.发送网络请求时，在界面的中间位置显示Loading组件
            //2.某一些请求，要求用户必须携带token，如果没有，则直接跳转到登录页面
            //3.params/data序列化操作
            return config
        },error => {
            console.log(error)
        })

        axios.interceptors.response.use(res=>{
            return res.data
        },err => {
            if(err && err.response){
                switch (err.response.status){
                    case 400:
                        console.log("请求错误")
                        break;
                    case 401:
                        console.log("未授权访问")
                        break
                    default:
                        console.log("其他错误信息")
                }

            }
        })
    }

    render() {
        return (
            <div>
                App11
            </div>
        );
    }
}
