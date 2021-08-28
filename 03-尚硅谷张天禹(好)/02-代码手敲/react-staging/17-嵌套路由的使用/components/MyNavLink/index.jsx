// 因为自带的NavLink，如果要写的路由比较多的话，就产生了很多重复代码
{/* <NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink>
<NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink>
<NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink>
<NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink>
<NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink>
<NavLink className="list-group-item" activeClassName='atguigu' to="/home">Home</NavLink> */}
// 所以我们有必要给它封装一下(封装成【一般组件】)
import React, { Component } from 'react'
import { NavLink} from 'react-router-dom'
export default class MyNavLink extends Component {
    render() {
        // console.log(this);
        // const { to, title, a, b, c } = this.props
        // const { title } = this.props
        // 我们不需要通过const { title } = this.props来拿到标签内容，可以通过children来拿
        // 这是to,a,b,c都可以不接收了，只用写一个title就行了
        // 传一些数据给props对象
        // console.log('render函数调用了一次',this.props);
        return (
            // <div>
            //     <h2>哈哈</h2>
            //     {/* 我们最后要返回的是NavLink，但是这个我们自己没有办法轻轻松松写出来 */}
            //     {/* 所以我们还是手动把它导入进来吧 */}
            // </div>

            // <NavLink className="list-group-item" activeClassName='atguigu' to="{to}">Home</NavLink>
            // 写错了！！to={to}才是对的！！大括号外面不能加引号！！！！
            // <NavLink className="list-group-item" activeClassName='atguigu' to={to}>Home</NavLink>
            // <NavLink className="list-group-item" activeClassName='atguigu' to={to}>{ title}</NavLink>
            // <NavLink className="list-group-item" activeClassName='atguigu' to={to} a={a} b={b} c={c}>{title}</NavLink>
            // 这样写的话代码量也不少,不要一个一个写
            // 对NavLink进行二次封装(原来的可以用，但是代码冗余量太大，不符合我的口味)
            // <NavLink className="list-group-item" activeClassName='atguigu' {...this.props}>{title}</NavLink>
            // 我们可以使用{...this.props}，这样可以把对象展开然后一个一个传给NavLink
            // <NavLink className="list-group-item" activeClassName='atguigu' {...this.props}>{this.props.children}</NavLink>
            // 这样写标签内容this.props.children可以，但是很麻烦
            <NavLink className="list-group-item" activeClassName='atguigu' {...this.props} />
            // 你这...this.props不仅把to,title,a,b,c带过去了，你同时也把你看不见的人children也带过去了，这样更好 
            // 总结：标签体内容就是一个特殊的标签属性
        )
    }
}

