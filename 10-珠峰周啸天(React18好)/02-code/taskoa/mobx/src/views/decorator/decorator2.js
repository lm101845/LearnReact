/**
 * @Author liming
 * @Date 2023/9/3 15:24
 **/

/**
 * 同一个装饰器可以作用在多个类上
 * 同一个类上也可以使用多个装饰器
 * 装饰器处理顺序：从下到上
 * */
const test = (target) => {
    console.log('test装饰器')
    target.num = 100
    target.getNum = function (){}
    target.prototype.say = function (){}
    // return 100
    // 装饰器函数的执行结果，会替换原有的类，所以不要return,否则就只会返回return后的值了
    //let Demo = test(_class = sum(_class = staticNum(_class = class Demo {}) || _class) || _class) || _class;
}

const sum = target =>{
    console.log('sum装饰器')
    target.prototype.sum = function (){}
}

const staticNum = target =>{
    console.log('staticNum装饰器')
    target.num = 10
    target.setNum = (val)=>{
        this.num = val
    }
}

const test1 = (x,y)=>{
    console.log('test1装饰器')
    //返回的函数是装饰器函数
    return (target)=>{
        target.num = x + y
    }
}

const handle = ()=>{
    console.log('handle装饰器')
    return target =>{
        target.handle = 'AAA'
    }
}
// @test1(10,20)
@test1(10,20)
@test
@sum
@staticNum
@handle()
class Demo {

}


console.dir(Demo)

