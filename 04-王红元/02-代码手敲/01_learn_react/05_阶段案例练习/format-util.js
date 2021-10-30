/*
 * @Author: liming
 * @Date: 2021-10-30 11:24:43
 * @LastEditTime: 2021-10-30 11:27:33
 * @FilePath: \LearnReact\04-王红元\02-代码手敲\01_learn_react\05_阶段案例练习\format-util.js
 */
// 这个是用来对数字进行格式化的文件
function formatPrice(price) {
  // 要求你传进来一个price，我才能对这个Price进行格式化
  if (typeof price !== 'number') {
    price = Number(price) || 0
    // 逻辑或表示如果前面为真则为真，前面为假，则默认值为后面的0
  }
  return '￥' + price.toFixed(2)
}
