/**
 * @Author liming
 * @Date 2023/5/16 17:50
 **/

/**
 * 在JavaScript中，Array是一种内置的数据类型，用于存储和操作一组值。它是一种有序的、可变的、可以包含任意数据类型的集合。
 * 当你在Array的原型对象（Array.prototype）上添加一个属性或方法时，它将对所有的Array实例生效。在这种情况下，当你执行`Array.prototype.BB = 200;`时，它会在Array的原型上添加一个名为BB的属性，并将其值设置为200。
 * 这意味着，无论你创建多少个Array实例，它们都会继承这个BB属性，并且其值都将是200。你可以通过访问Array实例的BB属性来获取或修改它的值。例如：
 * ```javascript
 * let arr = [1, 2, 3];
 * console.log(arr.BB); // 输出 200
 * arr.BB = 300;
 * console.log(arr.BB); // 输出 300
 * let arr2 = [4, 5, 6];
 * console.log(arr2.BB); // 输出 200，因为它继承自Array的原型
 * ```
 * 需要注意的是，修改Array的原型是不推荐的，因为它可能会导致意外的行为和不可预测的结果。通常情况下，我们应该遵循JavaScript提供的标准API来操作Array。
 */


/**
 * 封装一个对象迭代的方法
 *  +基于传统的for/in循环，会存在一些弊端[性能较差;既可以迭代私有的，也可以迭代共有的;只能迭代"可枚举、非Symbol类型"的属性]
 *  +解决思路：获取对象所有的私有属性[私有的、不论是否可枚举、不论类型]
 *      Object.getOwnPropertyNames(arr)——>获取对象非Symbol类型的私有属性【无关是否可枚举】
 *      Object.getOwnPropertySymbols(arr)——>获取Symbol类型的私有属性
 *      获取所有的私有属性：
 *      方法1：
 *      let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
 *      //方法2：基于ES6中的Reflect.ownKeys方法代替上述操作[弊端：不兼容IE]
 *      let keys1 = Reflect.ownKeys(arr)
 */

const each = function each(obj,callback){
    if(obj === null || typeof obj !== 'object')  throw new TypeError('obj is not a object')
    if (typeof callback !== 'function') throw new TypeError('callback is not a function')
    let keys = Reflect.ownKeys(obj)
    keys.forEach(key=>{
        let value = obj[key]
        //每一次迭代，都把回调函数执行
        callback(value,key)
    })
}
// Array.prototype.BB = 200;
let arr = [10,20]
arr[Symbol('AA')] = 100
// console.log(arr.BB)
// console.log(Object.getOwnPropertyNames(arr))
// console.log(Object.getOwnPropertySymbols(arr))
// //方法1
// let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr))
//
// //方法2
// let keys1 = Reflect.ownKeys(arr)    //
// console.log(keys,'keys')
// console.log(keys1,'keys1')
// console.log(arr)
//
// for (let key in arr) {
//     console.log(key,'--遍历')
// }
//
// keys1.forEach(key=>{
//     console.log(key,arr[key],'--写法')
// })

each(arr,(value,key)=>{
    console.log(value,key)
})
/**
 * createElement创建虚拟DOM对象
 * @param ele
 * @param props
 * @param children
 */
export function createElement(ele,props,...children){
    let virtualDOM = {
        $$typeof:Symbol('react.element'),
        key: null,
        ref:null,
        type:null,
        props:{}
    }
    let len = children.length
    virtualDOM.type = ele
    if(props !== null){
        virtualDOM.props = {...props}
    }
    if(len === 1){
        virtualDOM.props.children = children[0]
    }
    if(len > 1) {
        virtualDOM.props.children = children
    }
    return virtualDOM
}

/**
 * 把虚拟DOM变为真实DOM
 * @param virtualDOM
 * @param container
 */
export function render(virtualDOM,container){
    let {type,props} = virtualDOM;
    console.log(type,'打印virtualDOM的type')
    //说明存储的是标签名，动态创建这样一个标签
    if(typeof  type === 'string'){
        let ele = document.createElement(type)
        //为标签设置相关的属性及子节点
        each(props,(value,key)=>{
            //特殊属性处理：
            //className的处理:value存储的是样式类名
            if(key === 'className'){
                ele.className = value
                return
            }
            //style的处理:value存储的是样式对象
            if(key === 'style'){
                each(value,(val,attr)=>{
                    ele.style[attr] = val
                })
                return;
            }
            //children子节点的处理:value存储的是children属性值
            if(key === 'children'){
                let children = value;
                if(!Array.isArray(children)) children = [children]
                children.forEach(child=>{
                    //判断子节点类型
                    //子节点是文本节点，直接插入即可
                    if(/^(string|number)$/.test(typeof child)){
                        ele.appendChild(document.createTextNode(child))
                        return
                    }
                    //子节点又是一个virtualDOM:递归处理
                    render(child,ele)
                })
                return
            }
            ele.setAttribute(key,value)
        })
        //把新增的标签，添加到指定的容器中
        container.appendChild(ele)
    }
    if(typeof  type === 'function'){
        //会把函数执行
        //把virtualDOM中的props，作为实参传递给函数->DemoOne(props)
    }
}
