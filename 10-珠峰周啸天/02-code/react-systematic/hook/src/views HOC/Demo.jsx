/**
 * @Author liming
 * @Date 2023/8/2 16:17
 **/

/**
 * 高阶组件:利用JS中的闭包[柯里化函数]实现的组件代理
 * 我们可以在代理组件中，经过业务逻辑的处理，获取一些信息，最后基于属性等方案，传递给我们最终渲染的组件！！
 */
import React from 'react'

const Demo = (props) => {
    console.log('Demo中的属性',props)
    return <div className="demo">
        我是DEMO
    </div>
}

//执行ProxyTest方法,传递一个组件过来[Component]
// const ProxyTest = (Component)=>{
//     return function HOC(props){
//         console.log(props,'props高阶组件')
//         return <Component {...props}/>
//         //真正要渲染的是Demo组件，需要把获取的props传递给Demo
//     }
// }

//全写成箭头函数形式
const ProxyTest = (Component) => {
    return (props) => {
        let isUse = false
        console.log(props, 'props高阶组件22');
        return <Component {...props} isUse={isUse}/>;
        //真正要渲染的是Demo组件，需要把获取的props传递给Demo
    };
};

export default ProxyTest(Demo)
//把函数执行的返回结果基于ESModule规范导出,供App导入使用!!
//当前案例中,我们导出的是HOC(Higher Order Component---高阶组件)

