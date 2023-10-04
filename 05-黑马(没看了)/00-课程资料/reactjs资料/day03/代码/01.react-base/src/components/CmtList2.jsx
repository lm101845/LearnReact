import React from 'react'

// 导入 列表组件需要的 样式表
// 问题：这个 样式表，是只在 List 组件中生效嘛？
// 经过实验，发现，直接导入 css 样式表，默认是在全局上，整个项目都生效的！

// 思考：Vue 组件中的样式表，有没有 冲突的问题？？？
//   答案： Vue 组件中的样式表，也有冲突的问题；但是，可以使用 <style scoped></style>
// 疑问：React 中，有没有类似于 scoped 这样的指令呢？
//   答案：没有；因为 在 React 中，根本就没有指令的概念；
import cssobj from '@/css/cmtlist.scss'
console.log(cssobj);

// 如果在引用某个包的时候，这个包被安装到了 node_modules 目录中，
// 则，可以省略 node_modules 这一层目录，直接以包名开始引入自己的 模块 或 样式表
// 自己规定： 第三方的 样式表，都是以 .css 结尾， 这样，我们不要为 普通的 .css 启用模块化
//           自己的样式表，都要以 .scss 或 .less 结尾， 只为 .scss 或 .less 文件启用模块化
import 'bootstrap/dist/css/bootstrap.css'

// 导入 评论项 组件
import CmtItem from '@/components/CmtItem2'

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
      {/* <h1 className={cssobj.title + ' test'}>这是评论列表组件</h1> */}
      <h1 className={[cssobj.title, 'test'].join(' ')}>这是评论列表组件</h1>

      {/* <button className={[bootcss.btn, bootcss['btn-primary']].join(' ')}>按钮</button> */}
      <button className="btn btn-primary">按钮啊</button>

      {this.state.CommentList.map(item => <CmtItem {...item} key={item.id}></CmtItem>)}


    </div>
  }
}