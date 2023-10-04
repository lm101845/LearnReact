// 1. 导入包
import React from 'react'
import ReactDOM from 'react-dom'

let a = 10
let str = '你好，中国'
let boo = false
let title = '999'
const h1 = <h1>红火火恍恍惚惚</h1>
const arr = [
  <h2>这是h2</h2>,
  <h3>这是h3</h3>
]
const arrStr = ['毛利兰', '柯南', '小五郎', '灰原哀']

// 定义一个空数组，将来用来存放 名称 标签【方案1】
const nameArr = []
// 注意： React 中，需要把 key 添加给 被 forEach 或 map 或 for 循环直接控制的元素
arrStr.forEach(item => {
  const temp = <h5 key={item}>{item}</h5>
  nameArr.push(temp)
})


// 数组的 map 方法, map 中必须写 return
/* const result = arrStr.map(item => {
  return item + '~~'
})

console.log(result) */



// 3. 调用 render 函数渲染   jsx  XML 比 HTML 严格多了
// 什么情况下需要使用 {} 呢？ 当我们需要在 JSX 控制的区域内，写 JS 表达式了，则需要把 JS 代码写到 {} 中
ReactDOM.render(<div>
  {a + 2}
  <hr />
  {str}
  <hr />
  {boo ? '条件为真' : '条件为假'}
  <hr />
  <p title={title}>这是p标签</p>
  {h1}
  <hr />
  {/* {arr} */}
  {
    // 这是注释，你看不见我
  }
  <hr />
  {nameArr}
  <hr />
  {arrStr.map(item => <div key={item}><h3>{item}</h3></div>)}
  <hr />

  <p className="myele">！！！！！！！！！！</p>
  <label htmlFor="ooo">11111</label>
</div>, document.getElementById('app'))