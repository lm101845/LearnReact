/**
 * @Author liming
 * @Date 2023/9/11 17:34
 **/

/**
 * 当生成器函数执行：
 * ＋首先并不会立即把函数体中的代码执行
 * ＋而是返回一个具备迭代器规范的对象「itor」itor._proto_
 * + next
 * + throw
 * + return
 * + Symbol(Symbol.iterator) : function...
 * + 。。。
 * 当进行itor.next()执行的时候
 *  +把函数体中的代码开始执行
 *  +返回一个对象
 *   +done:记录代码是否执行完毕
 *   +value:记录本次处理的结果
 *
 *   ==========================
 *   generator生成器函数的作用：可以基于返回的itor(迭代器对象)，基于其next方法，控制函数体中的代码一步步去执行
 *    +每一次执行next，控制函数体中的代码就开始执行，直到遇到yield结束
 */
// const fn = function *(){
//     console.log('代码运行中',10)
//     return 100
// }
//
// // console.log('运行结束',fn())
//
// let itor = fn()
// console.log(itor.next())   //返回结果一定是对象
//
// console.log('================================')
//
// const fn1 = function * fn1(){
//
// }

//对于ES6快捷赋值的语法，我们在方法名前面设置*,就可以创建生成器函数了
// let obj = {
//     *sum(){
//
//     }
// }

// console.log(obj.sum())


// const fn2 = function * fn2(){
//     console.log('A')
//     yield 100
//     console.log('B')
//     yield 200
//     console.log('C')
//     yield 300
// }
// let itor = fn2()
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// // console.log(itor.throw('手动抛异常，后面的代码就都不执行了'))
// // console.log(itor.return('return以后，后面的代码也不执行了'))
// console.log(itor.next())


// console.log('=====================')
// const fn3 = function * fn3(...params){
//     console.log('A')
//     let x = yield 100
//     console.log(x)
//     yield 200
// }
// let itor = fn3(10,20,30)
// console.log(itor.next('first:111'))
// //第一次执行next方法，传递的值没有用
// console.log(itor.next('second:222'))


// console.log('=====================')
//生成器函数的嵌套
// const sum = function *sum(){
//     yield 300
//     yield 400
// }
//
// const fn4 = function *fn4(){
//     yield 100
//     yield* sum()   //yield*：支持让我们进入另外一个生成器函数中去一步步执行
//     yield 200
// }
//
// let itor = fn4()
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log(itor.next())
// console.log('=============')

const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`@@${interval}`)
        }, interval)
    })
}

// delay(3000).then(value => {
//     console.log(value)
// })


//需求：串行请求(后面请求需要前面请求的值)，有2个请求：请求需要的时间分别是1000ms,2000ms,3000ms
// delay(1000)
//     .then(value => {
//         console.log('第一次请求成功', value)
//         return delay(2000)
//             .then(value => {
//                 console.log('第二次请求成功', value)
//                 return delay(3000)
//             })
//             .then(value => {
//                 console.log('第三次请求成功', value)
//             })
//             .catch(response => {
//                 console.log('任何请求失败，都执行这里')
//             })
//     })

// (async () => {
//     let value = await delay(1000)
//     console.log('第一次请求成功', value)
//     value = await delay(2000)
//     console.log('第二次请求成功', value)
//     value = await delay(3000)
//     console.log('第三次请求成功', value)
// })()


//基于generator函数，模拟await语法，实现请求的串行
const handle = function *handle(){
    let value = yield delay(1000)
    console.log('第一次请求成功',value)
    value = yield delay(2000)
    console.log('第二次请求成功', value)
    value = yield delay(3000)
    console.log('第三次请求成功', value)
}


//可以实现效果，但是代码很恶心
// let itor = handle()
// let {done,value} = itor.next()
// value.then(x=>{
//     //x:第一个请求的结果 @@1000
//     // console.log(x)
//     let {done,value} = itor.next(x)
//     value.then(x=>{
//         // console.log(x)
//         let {done,value} = itor.next(x)
//         value.then(x=>{
//             let {done,value} = itor.next(x)
//         })
//     })
// })

//编写通知generator中代码统一执行的方法
//async await是promise + generator的语法糖
const AsyncFunction = function AsyncFunction(generator,...params){
    let itor = generator(...params)
    //基于递归的方法，通知generator函数中的代码逐一执行
    const next = x=>{
        let {done,value} = itor.next(x)
        if(done) return
        if(!(value instanceof Promise)) value = Promise.resolve(value)
        value.then(next)
    }
    next()
}

// AsyncFunction(handle)

AsyncFunction(function *(x,y){
    let total = x + y
    let value = yield total
    console.log('第一次处理的结果',value)
    yield delay(2000)
    console.log('@2,哈哈哈')
})
