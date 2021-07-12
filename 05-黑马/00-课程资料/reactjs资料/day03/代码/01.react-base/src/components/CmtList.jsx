import React from 'react'

// 导入 评论项 组件
import CmtItem from '@/components/CmtItem'

export default class CmtList extends React.Component {
  constructor() {
    super()
    this.state = {
      CommentList: [ // 评论列表数据
        { id: 1, user: '张三', content: '哈哈，沙发' },
        { id: 2, user: '李四', content: '哈哈，板凳' },
        { id: 3, user: '王五', content: '哈哈，凉席' },
        { id: 4, user: '赵六', content: '哈哈，砖头' },
        { id: 5, user: '田七', content: '哈哈，楼下山炮' }
      ]
    }
  }

  render() {
    return <div>
      {/* 注意：在 JSX 中，如果想写 行内样式了，不能 为 style 设置 字符串的值 */}
      {/* 而是应该 这么写：    style={ { color: 'red' } } */}
      {/* <h1 style="color:red;">这是评论列表组件</h1> */}
      {/* 在 行内样式中，如果 是 数值类型的样式，则可以不用引号包裹，如果是 字符串类型的 样式值，必须使用 引号包裹 */}
      <h1 style={{ color: 'red', fontSize: '35px', zIndex: 3, fontWeight: 200, textAlign: 'center' }}>这是评论列表组件</h1>


      {this.state.CommentList.map(item => <CmtItem {...item} key={item.id}></CmtItem>)}
    </div>
  }
}