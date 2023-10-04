import React from 'react'

// 第一种创建组件的方式
export default function Hello(props) {
  // 如果 在一个组件中 return 一个 null。则表示此组件是空的，什么都不会渲染
  // return null
  // 在组件中，必须 返回一个 合法的 JSX 虚拟DOM元素
  // props.name = 'zs'
  console.log(props)
  // 结论：不论是 Vue 还是 React，组件中的 props 永远都是只读的；不能被重新赋值；

  return <div>这是 Hello 组件 --- {props.name} --- {props.age} --- {props.gender}</div>
}

// 把组件暴露出去
// export default Hello