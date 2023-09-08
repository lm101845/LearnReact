/**
 * @Author liming
 * @Date 2023/9/8 22:03
 **/
import React,{useState} from 'react'
import {Button} from 'antd-mobile'
const ButtonAgain = (props) => {
    //props中包含了调用<Button>组件时候的属性
    let options = {...props}
    let {children,onClick:handle} = options
    // console.log(children,handle,'handle打印')
    //props是只读的，我们不能直接对props属性进行操作，所以赋给给一个变量进行操作
    delete options.children
    delete options.onClick
    //删除对象的属性通常是为了减少对象的大小或者保护对象的安全。删除这两个属性可能是为了确保组件的其他属性保持“纯净”
    //除了children和onClick，剩下的都原封不动的传给Button
    //并且要给Button添加一个属性，loading



    /*状态*/
    let [loading,setLoading] = useState(false)
    const clickHandle = async ()=>{
        // console.log('clickHandle函数执行了')
        setLoading(true)
        try{
            await handle()
            // console.log('handle函数执行以后')
        }catch (_){}
        //不管最后成功还是失败，我都会把loading改成false
        setLoading(false)
        // console.log('loading改成false了')
    }

    if(handle){
        options.onClick = clickHandle
    }
    return <Button {...options} loading={loading}>
        {children}
    </Button>
}

export default ButtonAgain
