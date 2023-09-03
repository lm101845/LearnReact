/**
 * @Author liming
 * @Date 2023/9/3 13:33
 **/
//JS装饰器(还没出来，处于stage2阶段)
const test = (target) => {
    //test:Demo此处就是给类设置静态私有属性方法
    target.num = 100
    target.getNum = function (){}
    target.prototype.say = function (){}
}

//等价于test(Demo)
@test
class Demo {

}
//装饰器不能给普通函数加，要给class加
// @test
// function Child(){}

@test
class Child{}



console.dir(Demo)
console.dir(Child)
