
import React from 'react'

/**
 * React中合成事件的处理，绝对不是基于addEventListener单独做的事件绑定，React中的合成事件，都是基于[事件委托处理的]
 * React17及以后版本，都是委托给#root容器[捕获和冒泡都做了委托]
 * React17版本以前，都是委托给document容器[只做了冒泡阶段的委托]
 * 对于没有实现事件传播机制的事件[如onMouseEnter]，才是单独做的事件绑定
 */
class Demo extends React.Component {
    render() {
        return <div className="outer" onClick={()=>{console.log('outer冒泡[合成]')}} onClickCapture={()=>{console.log('outer捕获[合成]')}}>
                <div className="inner" onClick={()=>{console.log('inner冒泡[合成]')}} onClickCapture={()=>{console.log('inner捕获[合成]')}}></div>
            </div>
    }

    componentDidMount() {
        document.addEventListener('click',()=>{
            console.log('document捕获')
        },true)   //true表示捕获
        document.addEventListener('click',()=>{
            console.log('document冒泡')
        },false)


        document.body.addEventListener('click',()=>{
            console.log('body捕获')
        },true)   //true表示捕获
        document.body.addEventListener('click',()=>{
            console.log('body冒泡')
        },false)


        let root = document.querySelector('#root')
        root.addEventListener('click',()=>{
            console.log('root捕获')
        },true)
        root.addEventListener('click',()=>{
            console.log('root冒泡')
        },false)


        let outer = document.querySelector('.outer')
        outer.addEventListener('click',()=>{
            console.log('outer捕获[原生]')
        },true)
        outer.addEventListener('click',()=>{
            console.log('outer冒泡[原生]')
        },false)


        let inner = document.querySelector('.inner')
        inner.addEventListener('click',()=>{
            console.log('inner捕获[原生]')
        },true)

        inner.addEventListener('click',()=>{
            console.log('inner冒泡[原生]')
        },false)
    }

}

export default Demo

