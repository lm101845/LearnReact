import React, { Component, Fragment } from 'react'

export default class Demo extends Component {
    render() {
        return (
            // <div b='2'>
            //     {/* 这里的div层级太多，root,a=1,b=2,一共有3个div */}
            //     <input type="text" />
            //     <input type="text" />
            // </div>

            // 写法1
            // <Fragment>
            //     {/* 这里的div层级太多，root,a=1,b=2,一共有3个div */}
            //     {/* Fragment就相当于是template，解析完就扔 */}
            //     <input type="text" />
            //     <input type="text" />
            // </Fragment>

            // 写法2——外面写一个空标签也行
            <>
                <input type="text" />
                <input type="text" />
            </>

            // 区别：在遍历一堆结构的时候，我们要用一堆标识key
            // Fragment是允许你写key值的(只接收key标签，其他都不接收！！！！)，但是空标签什么东西都不能写
        )
    }
}
