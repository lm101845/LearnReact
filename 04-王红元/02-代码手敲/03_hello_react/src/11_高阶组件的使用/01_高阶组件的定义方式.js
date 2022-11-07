/**
 * @Author liming
 * @Date 2022/11/7 18:58
 **/

import React, {PureComponent} from 'react';

class App extends PureComponent {
    render() {
        return (
            <div>
                App:{this.props.name}
            </div>
        );
    }
}

// App.displayName = "Parent"
//开发中是可以对组件名字定义的

//1.高阶类式组件
// function enhanceComponent(WrappedComponent){
//     // return class NewComponent extends PureComponent{
//     // return class  extends PureComponent{
//     class  NewComponent extends PureComponent{
//         //类的写法，名字不写也是可以的
//         render() {
//             return <WrappedComponent {...this.props}/>
//         }
//     }
//     NewComponent.displayName = "Kobe"
//     return NewComponent
// }
//
// const EnHanceComponent = enhanceComponent(App)
//
// export default  EnHanceComponent
//import App from './11_高阶组件的使用/01_高阶组件的定义方式'
//export default不关心你取的什么名字，所以我就叫App是可以的吧

//2.高阶函数式组件
function enhanceComponent2(WrappedComponent){
    function NewComponent(props){
        return <WrappedComponent {...props}/>
    }
    NewComponent.displayName = "Kobe1"
    return NewComponent
}

const EnHanceComponent = enhanceComponent2(App)

export default  EnHanceComponent
