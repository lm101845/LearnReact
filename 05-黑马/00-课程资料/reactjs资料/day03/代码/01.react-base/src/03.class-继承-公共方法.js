// 这是父类 【大家可以直接把 父类，理解成 原型对象 prototype】
class Person {
  constructor(name, age){
    this.name = name
    this.age = age
  }

  // 打招呼 的 实例方法
  sayHello(){
    console.log('大家好')
  }
}


// 这是子类 美国人 
// 在 class 类中，可以使用 extends 关键字，实现 子类继承父类
// 语法：  class 子类 extends 父类 {}
class American extends Person {
  constructor(name, age){
    // 问题1：为什么一定要在 constructor 中调用 super
    //   答案： 因为，如果一个子类，通过 extends 关键字继承了父类，那么，在子类的 constructor 构造函数中，必须 优先调用一下 super()
    // 问题2：super 是个什么东西？
    //   答案： super 是一个函数，而且，它是 父类的 构造器；子类中的 super,其实就是父类中，constructor 构造器的一个引用；
    // 问题3：为什么 调用了 super() 之后，a1 实例的 name 和 age 都变成 undefined 了？
    super(name, age)
  }
}

const a1 = new American('Jack', 20)
console.log(a1)
a1.sayHello()


// 这是子类 中国人
class Chinese extends Person{
  // name 姓名 
  // age 年龄
  // IDNumber 身份证号 【中国人独有的】，既然是独有的，就不适合 挂载到 父类上；
  constructor(name, age, IDNumber){
    super(name, age)
    // 语法规范：在子类中， this 只能放到 super 之后使用
    this.IDNumber = IDNumber
  }
}

const c1 = new Chinese('张三', 22, '130428******')
console.log(c1)
c1.sayHello()