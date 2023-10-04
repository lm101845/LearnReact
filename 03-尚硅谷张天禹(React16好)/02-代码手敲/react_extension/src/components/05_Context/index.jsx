 import React, { Component } from 'react'
import './index.css'
 
//创建一个用于保存用户名的上下文
// 创建Context对象
const MyContext = React.createContext()
// 这里的MyContext是大写的原因是组件标签是要大写的
const { Provider,Consumer} = MyContext

export default class A extends Component {
    //  A组件是祖父组件——爷爷
    state = {
        username: 'tom',
        age: 18
    }
    render() {
         const { username,age} = this.state
         return (
             <div className='parent'>
                 <h3>我是A组件</h3>
                 <h4>我的用户名是：{username}</h4>
                 {/* <MyContext.Provider>
                     <B />
                 </MyContext.Provider> */}
                 {/* 你要是嫌.Provider麻烦，可以使用解构赋值 */}

                 {/* <Provider value={username}> */}
                 {/* <Provider value={{ username: username, age: age }}> */}
                 <Provider value={{ username, age}}>
                     {/* 你这样写，传递的就不是字符串了，而是对象了 */}

                     {/* 注意：这里的value是固定名字，不能起别的名字，就叫value */}
                     {/* Provider有供应者，养家者的意思 */}
                     {/* 你这么一写完，那么B组件，以及B组件的子组件C组件就都能收到你所能传递过来的用户名了 */}
                     {/* 准确的说，谁【声明】——举一下手，谁才能使用 */}
                     {/* 具体在哪里收呢？就在组件实例对象的context身上 */}
                     <B />
                 </Provider>
             </div>
         )
     }
}
 
class B extends Component {
    render() {
        console.log('B是收不到的，因为你没声明，没跟人说你要', this.context);
        // 如果是父子之间，就不用这么玩的，就用最简单的props就行了
        return (
            <div className='child'>
                <h3>我是B组件</h3>
                <C/>
            </div>
        )
    }
}

// 注意：一般应用开发中不使用context,一般
// class C extends Component {
//     //声明接收context
//     static contextType = MyContext
//     render() {
//         const {username,age } = this.context
//         console.log('C可以收到，因为你声明了，所以你可以要到',this.context);
//         return (
//             <div className='grand'>
//                 <h3>我是C组件</h3>
//                 {/* <h4>我从A组件接收到的用户名:{this.context}</h4> */}
//                 {/* <h4>我从A组件接收到的用户名:{this.context.username}</h4>
//                 <h4>我从A组件接收到的年龄:{this.context.age}</h4> */}
//                 {/* 使用这种写法，就没有打扰B组件，没有通过B来拿东西 */}

//                 <h4>我从A组件接收到的用户名:{username}</h4>
//                 <h4>我从A组件接收到的年龄:{age}</h4>
//             </div>
//         )
//     }
// }


// 问题：如果C不是拿类写的你怎么办？？你就用不了this,也写不了static contextType = MyContext这种了
//我们还有另一种方法(这种方法函数式组件和类式组件都可以使用)
function C() {
            return (
            <div className='grand'>
                <h3>我是C组件</h3>
                    <h4>我从A组件接收到的用户名:
                        {/* <Consumer>
                            {
                                value => {
                                    console.log(value);
                                    // 你传的是什么,value就是什么
                                    // return `${value.username},年龄是${value.age}`
                                    return `${value.username},年龄是${value.age}`
                                }
                            }
                        </Consumer> */}

                        {/* 简写形式 */}
                        <Consumer>
                            {value => `${value.username},年龄是是${value.age}`}
                        </Consumer>
                </h4>
            </div>
        )
}
 