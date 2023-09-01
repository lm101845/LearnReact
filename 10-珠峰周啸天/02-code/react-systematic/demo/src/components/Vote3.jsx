// export default Vote2

class Parent{
    //new的时候，执行的构造函数[可写可不写];需要接收传递进来的实参信息，才需要设置constructor
    // constructor(x,y) {
    //     console.log(x,y)
    //     //this->创建的实例
    //     this.total = x + y
    //     this.num = 210
    // }
    star = 5
    //在外面写，也可以给实例添加属性,和在构造函数中写this.star = 5效果一样(所以我们可以不用写构造函数了)
    getNum = ()=>{
        //箭头函数没有自己的this,所用到的this是宿主环境中的,这里的this就是所创建的实例
        console.log(this)
    }

    //这样写(非箭头函数写法)，不是和上面一样给实例添加私有属性了，而是添加原型方法(只能在原型上找，且不可枚举)
    sum(){
        //类似于sum = function sum(){}
        //它是给Parent.prototype上设置公共方法[不可枚举]
    }

    //把构造函数当成一个普通对象，为其设置静态的私有属性方法Parent.average()
    static average(){
        console.log('静态方法')
    }
}

Parent.prototype.y = 2000     //在外部手动给构造函数原生上设置公共的属性
let p = new Parent(10,20)
console.log('p',p)
p.getNum()
console.dir(Parent)
