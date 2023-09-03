/**
 * @Author liming
 * @Date 2023/9/3 16:20
 **/

const A = ()=>{
    console.log(1)
    return ()=>{
        console.log(2)
    }
}

const B = ()=>{
    console.log(3)
    return ()=>{
        console.log(4)
    }
}
const test = (target,name,descriptor)=>{
    //返回值必须是一个规则的描述对象,也就是对name修饰属性/方法的规则描述
    return {
        enumerable:false,
        initializer(){
            // return '@@'
            return descriptor
        }
    }
}

class Demo{
    @test
    @A()
    @B()
    x = 100
}

console.dir(Demo)
//==>1 3 4 2  先把函数执行，函数的返回值(小函数)作为装饰器函数,从下向上处理

let d = new Demo()
console.log('ddd',d)
