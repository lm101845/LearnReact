function Person(name, age) {
  this.name = name
  this.age = age
}

// info 属性，直接挂载给了构造函数，所以它是静态属性
Person.info = 'aaaa'

// 实例方法
Person.prototype.say = function () {
  console.log('这是 Person 的实例方法')
}

// 静态方法
Person.show = function () {
  console.log('这是 Person 的静态 show 方法')
}

const p1 = new Person('王多多', 18)
console.log(p1)
p1.say() // 这是 实例方法
Person.show()


// -------------华丽丽的分割线--------------------
console.log('---------------------------------')

// 创建了一个动物类
// 注意1：在 class 的 { } 区间内，只能写 构造器、静态方法和静态属性、实例方法
// 注意2：class 关键字内部，还是用 原来的配方实现的；所以说，我们把 class 关键字，称作 语法糖；
class Animal {
  // 这是类中的 构造器
  // 每一个类中，都有一个构造器，如果我们程序员没有手动指定构造器，那么，可以认为类内部有个隐形的、看不见的 空构造器，类似于 constructor(){}
  // 构造器的作用，就是，每当 new 这个类的时候，必然会优先执行 构造器中的代码
  constructor(name, age) {
    // 实例属性
    this.name = name
    this.age = age
  }

  // 在 class 内部，通过 static 修饰的属性，就是静态属性
  static info = "eee" // （今后用的不多）

  // 这是动物的实例方法(今后会经常用到 实例方法)
  jiao() {
    console.log('动物的实例方法')
  }

  // 这是 动物 类的静态方法（今后用的不多）
  static show() {
    console.log('这是 Animal 的静态 show 方法')
  }
}

const a1 = new Animal('大黄', 3)
console.log(a1)
a1.jiao() // 这是实例方法
Animal.show()