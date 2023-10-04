// 1. 导入包
// import React, {Component} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'

// 使用 ES6中 import 导入需要的组件
// import Hello from '@/components/Hello'

// 导入 class 继承
// import '@/03.class-继承-公共方法'


// class 关键字创建组件
class Movie extends React.Component {

  // 构造器
  constructor() {
    // 由于 Movie 组件，继承了 React.Component 这个父类，所以，自定义的构造器中，必须 调用 super()
    super()
    // 只有调用了 super() 以后，才能使用 this 关键字
    this.state = { // 这个 this.state = {} 就相当于 Vue 中的 data() { return { } }
      msg: '大家好，我是 class 创建的 Movie组件'
    }
  }

  // render 函数的作用，是 渲染 当前组件所对应的 虚拟DOM元素
  render() {
    // return null
    // 在 class 关键字创建的组件中，如果想使用 外界传递过来的 props 参数，不需接收，直接通过 this.props.*** 访问即可

    // 注意：不论是 class 还是普通 function 创建的组件，它们的 props 都是只读的；
    // this.props.name = '李四'

    // 在 class 创建的组件中， this.state 上的数据，都是可读可写的！
    // this.state.msg = 'msg的值被我修改了！'

    return <div>
      {/* 注意：在 class 组件内部，this 表示 当前组件的实例对象 */}
      这是 Movie 组件 -- {this.props.name} -- {this.props.age} -- {this.props.gender}
      <h3>{this.state.msg}</h3>
    </div>
  }
}


const user = {
  name: 'zs',
  age: 22,
  gender: '男'
}

// 3. 调用 render 函数渲染
ReactDOM.render(<div>
  123
  {/* <Hello name={user.name} age={user.age}></Hello> */}
  {/* <Hello {...user}></Hello> */}

  {/* 这里的 Movie 标签，其实，就是 Movie 类的一个实例对象 */}
  {/* <Movie name={user.name} age={user.age}></Movie> */}
  <Movie {...user}></Movie>


</div>, document.getElementById('app'))