import React from 'react' // 将来，在每个独立的组件文件中，第一行，必须要 先倒入 react 包

// 在 webpack 中，每一个 单独的 JS 文件或 JSX 文件，都有自己独立的作用域；默认，外界无法访问 模块中的成员；
export default function Hello(props) {
  console.log(props)
  return <div>
    这是 用 function 构造函数创建的组件 --{props.name} -- {props.age} -- {props.gender}
  </div>
}

// 使用ES6  export default 向外暴露成员
// export default Hello