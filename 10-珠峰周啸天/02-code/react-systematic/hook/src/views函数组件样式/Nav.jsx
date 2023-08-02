/**
 * @Author liming
 * @Date 2023/8/1 11:43
 **/
import React from 'react'
// import './Nav.less'
import {createUseStyles} from "react-jss";
//createUseStyles是用JS写CSS样式
//返回的结果是一个自定义hook函数
//可以类似于less等预编译语言的嵌套语法,给其后代
const useStyles = createUseStyles({
    box: {
        backgroundColor: 'lightblue',
        // width:'100px',
    },
    title: {
        fontSize: '200px',
        color:'red',
        // '&:hover': {
        //     color: props => props.color,
        // }
    },
    list: {
        '& a': {
            fontSize: '32px',
            color: 'yellow'
        }
        // '& a': props=>{
        //     console.log(props,'props')
        //    return {
        //        fontSize: props.size + 'px',
        //        color: 'yellow'
        //    }
        // }
    }
})
const Nav = () => {
    console.log(useStyles())
    let {box, title, list} = useStyles({
        size: 28,
        color: 'grey'
    })
    return <div className={box}>
        <h2 className={title}>购物商城</h2>
        <div className={list}>
            <a href="">首页</a>
            <a href="">秒杀</a>
            <a href="">我的</a>
        </div>
    </div>
}

export default Nav
