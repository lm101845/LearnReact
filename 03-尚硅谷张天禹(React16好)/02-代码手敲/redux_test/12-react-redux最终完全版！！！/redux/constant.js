/*
 * @Author: liming
 * @Date: 2021-08-30 21:23:36
 * @LastEditTime: 2021-09-04 21:31:39
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\constant.js
 */

/*在实际工作中，再定义一个常量模块，防止你复制常量复制错了
* 该模块是用于定义action对象中type类型的常量值，防止你写错
* 我们一般把常量写成纯大写
* 目的只有一个：便于管理的同时(以后要是常量名字想改的话直接在这里改，而不用一个一个批量去改了)防止程序员单词写错
*/

export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
export const ADD_PERSON = 'add_person'
