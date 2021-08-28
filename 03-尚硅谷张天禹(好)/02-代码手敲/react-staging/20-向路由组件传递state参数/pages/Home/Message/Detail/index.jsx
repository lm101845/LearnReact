import React, { Component } from 'react'
// import qs from 'querystring'
// //这个库React脚手架已经帮你下载好了
// let obj = { name: 'tom', age: 18 }
// console.log(qs.stringify(obj));   //name=tom&age=18
// //name=tom&age=18  key=value&key=value
// //这种属于urlencoded编码形式,querystring这个库的作用就是将一个对象转为url-encoded编码格式

// let str = 'carName=奔驰&price=199'
// console.log(qs.parse(str));   //{carName: "奔驰", price: "199"}
const Detaildata = [
    { id:'01',content:'你好，中国'},
    { id:'02',content:'你好，尚硅谷'},
    { id:'03',content:'你好，未来的自己'},
]
export default class Detail extends Component {
    render() {
        //接收params参数
        // const { id,title} = this.props.match.params
        console.log(this.props);
        // 看一下detail到底接收到什么东西了

        // 接收search参数——其实它就是params参数
        // search参数无需声明接收，就是取出来有点麻烦
        // const { search } = this.props.location;
        // console.log(search);
        // console.log(search.slice(1));
        // const result = qs.parse(search)
        //  console.log(result);
        //  console.log(result.slice(1));  //这种写法错误，因为result已经是对象了
        // const {id,title } = qs.parse(search)
        // const { id, title } = qs.parse(search.slice(1))
        
        //接收state参数
        //此时地址栏里面没有东西，最后就是detail,state参数没有在地址栏中有提现
        // const {id,title} = this.props.location.state
        // 你如果把缓存清了，再打开就报错了，this.props.location.state变成undefined了，
        // 所以使用下面的写法，如果有值，就用你的值，如果没有值，就用空对象，我从空对象里面解构赋值不报错
        const { id, title } = this.props.location.state || {}
        const findResult = Detaildata.find(detailObj => {
            return detailObj.id === id
        }) || {}
        return (
            <ul>
                <li>ID:{ id}</li>
                <li>TITLE:{ title}</li>
                <li>CONTENT:{findResult.content }</li>
            </ul>
        )
    }
}
