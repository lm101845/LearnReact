/**
 * @Author liming
 * @Date 2023/9/2 10:45
 **/

/**
 * headers类：头处理类[请求头或响应头]
 *
 */
import qs from 'qs'
// import React, { useRef } from 'react';

let head = new Headers
head.append('Content-Type', 'application/json')
head.append('name', 'zhangsan')
// let promise实例 = fetch(请求地址，配置项)
head.forEach((item, index) => {
    console.log(item, index)
})
console.log(head.get('Content-Type'))
let p = fetch('/api/getTaskList', {
    // headers:{
    //     'Content-Type':'application/json'
    // }
    headers: head
})

p.then(res => {
    console.log('成功', res)
    let {headers, status, statusText} = res
    console.log(headers, 'headers', status, 'status', statusText, 'statusText')
    console.log(headers.get('Date'), '服务器时间')
    //进入then中的时候，不一定是请求成功[因为状态码可能是各种情况]
    if (/^(2|3)\d{2}$/.test(status)) {
        // console.log('成功222',res.body,res.json())
        //res.json()还是Promise对象！！还要在.then一次
        // return
        // return res.formData()   //格式转换失败！！
        return res.json()
    }
    //获取数据失败的
    return Promise.reject({
        code: -100,
        status,
        statusText
    })   //会被catch捕获
}).then(value => {
    console.log(value, '点2次then拿到最后处理结果')
})
    .catch(reason => {
        //fetch只要服务器有返回值，只要网络通信正常(即使是404)也会返回成功
        //fetch和axios有一个不一样的地方：
        // +在fetch中，只要服务器有反馈信息(不论http状态码多少),都说明网络请求成功，最后实例都是fulfilled
        //  只有服务器没有任何反馈(例如请求中断、请求超时、断网),实例p才是rejected
        // + 在axios中，只有返回的状态码是以2开始的，才会是实例成功
        console.log('失败111', reason)
        //会有不同的失败情况
        //1.服务器没有返回任何的信息
        //2.状态码不对
        //3.数据转换失败
    })


console.log('==================================')
// const buttonRef = useRef(null);
// document.body.addEventListener('click', function () {
// // buttonRef.current.addEventListener('click', function () {
//     console.log('点击按钮了')
//     fetch('/api/addTask', {
//         method: 'POST',
//         //设置请求头
//         headers: {
//             'Content-Type': 'application/x-www.form-urlencoded'
//         },
//         //自己手动把请求主体格式变成服务器所需要的
//         body: qs.stringify({
//             task: '我学会了fetch操作',
//             time: '2023-09-02 12:37:00'
//         })
//     }).then(res => {
//         console.log('成功', res)
//         let {headers, status, statusText} = res
//         console.log(headers, 'headers', status, 'status', statusText, 'statusText')
//         console.log(headers.get('Date'), '服务器时间')
//         if (/^(2|3)\d{2}$/.test(status)) {
//             return res.json()
//         }
//         //获取数据失败的
//         return Promise.reject({
//             code: -100,
//             status,
//             statusText
//         })   //会被catch捕获
//     }).then(value => {
//         console.log(value, '点2次then拿到最后处理结果')
//     })
//         .catch(reason => {
//             console.log('失败111', reason)
//
//         })
// })


/**fetch请求中断*/
let ctrol = new AbortController()
fetch('/api/removeTask?id=18', {
    signal:ctrol.signal
    //请求中断的信号
})
    .then(res => {
        console.log('成功', res)
        let {headers, status, statusText} = res
        console.log(headers, 'headers', status, 'status', statusText, 'statusText')
        console.log(headers.get('Date'), '服务器时间')
        if (/^(2|3)\d{2}$/.test(status)) {
            return res.json()
        }
        //获取数据失败的
        return Promise.reject({
            code: -100,
            status,
            statusText
        })   //会被catch捕获
    }).then(value => {
    console.log(value, '点2次then拿到最后处理结果')
})
    .catch(reason => {
        console.log('请求中断了11111111111', reason)
    })
//立即中断
ctrol.abort()
