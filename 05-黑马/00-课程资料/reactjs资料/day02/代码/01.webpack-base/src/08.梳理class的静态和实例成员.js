class Animal {
  constructor(name, age) {
    this.name = name // 实例属性 因为这些通过 this 挂载的属性，都是通过 new 出来的实例访问的
    this.age = age
  }

  // 如果要定义静态属性，则需要和 constructor,并且，这个属性，需要被 static 关键字修饰
  // 静态属性的定义： 无法通过实例 访问，只能通过 类名 来访问的属性；
  static info = { address: '北京', location: '马坡南' }

  // 实例方法
  say() {
    console.log('实例 say 方法')
  }
  // 静态方法
  static show() {
    console.log('静态 show 方法')
  }
}

const a1 = new Animal('小黄', 2)
console.log(a1)
console.log(a1.name) // 通过 实例，直接 访问实例属性
a1.say() // 通过 实例，直接 访问实例方法
console.log(Animal.info) // 通过类名，直接 访问静态属性
Animal.show() //  通过类名，直接 访问静态方法

// 实例的 属性 或 方法，都是 通过 new 出来的实例对象来访问的；
// 静态的属性 或方法，都是 直接通过 类名 来访问的；（表现形式：通过 static 来修饰）