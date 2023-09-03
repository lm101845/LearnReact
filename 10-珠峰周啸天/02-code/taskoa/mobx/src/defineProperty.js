/**
 * @Author liming
 * @Date 2023/9/3 13:03
 **/

/**
 * Object.defineProperty
 * */

/**
 * 对象本身的规则限制：
 *  冻结
 *  密封
 *  扩展
 * */

/***
 * Object.getOwnPropertyDescriptor() 静态方法返回一个对象，
 * 该对象描述给定对象上特定属性（即直接存在于对象上而不在对象的原型链中的属性）的配置。
 * 返回的对象是可变的，但对其进行更改不会影响原始属性的配置。
 */
let obj = {
    x:100,
    y:200
}
console.log(Object.getOwnPropertyDescriptor(obj,'x'),'对象xxx')

Object.defineProperty(obj,'x',{
    enumerable:false,
    writable:false,
    configurable:false
})

Object.defineProperty(obj,'y',{
    get(){
        //后期获取obj.y信息的时候，就会触发get函数执行
        console.log('get函数触发了')
    },
    set(){
        //设置成员值的时候，会触发set函数
    }
})

obj.x = 20  //改了没用
console.log(obj,'打印obj')
console.log(obj.y,'打印obj.y才会触发get函数')
