/**
 * @Author liming
 * @Date 2023/9/3 15:41
 **/

/**类中属性或方法的装饰器*/

//在给实例设合资私有属性的时候，触发装饰器函数执行，以此来给属性进行装饰
const test = (target,name,descriptor)=>{
    console.log(target,'target',name,'name',descriptor,'descriptor')
    //target:Demo.prototype
    //name:'x'
    //descriptor:{configurable: true, enumerable: true, writable: true, initializer: ƒ}
}

const readonly = (_,name,descriptor)=>{
    //把修饰的name属性和方法设置为只读的规则
    descriptor.writable = false
}

//创建用来执行时间日志的装饰器
const loggerTime = (_,name,descriptor)=>{
    console.log('=============》函数外面的this')
    //把之前写的函数赋值给func
    let func = descriptor.value
    console.log(func,'打印func')
    //然后把函数重写了d.getX(),执行的是重写的这个函数
    descriptor.value = function proxy(...params){
        console.log(this,'函数里面的this')
        console.time(name)
        // func(...params)
        let res = func.call(this,...params)
        console.timeEnd(name)
        return res
    }
}
class Demo{
    @test
    //对属性装饰
    @readonly x = 100

    // @test
    //对方法装饰
    // @readonly
    @loggerTime
    getX(){
        return this.x
    }

    @loggerTime
    sum(){
        for (let i = 0; i < 100000; i++){

        }
    }
}

let d = new Demo()
// d.x = 200   //此时不能修改了
console.log('==========d',d,'==========d')
console.log(d.getX(10,20),'getX函数')
d.sum()

//getX也变成只读的了，不能修改了
// Demo.prototype.getX = function (){
//
// }
