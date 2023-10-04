/**
 * @Author liming
 * @Date 2023/8/4 16:37
 **/
const combineReducers = (reducers)=>{
    //reducers是一个对象，以键值对存储了：模块名&每个模块的reducer
    let reducerskeys = Reflect.ownKeys(reducers)
    /**
     * Object.keys能返回方法属性，只不过Object.keys返回的是可枚举属性，当设置对象的enumerable设置为false， 那就无法遍历。
     * Reflect.ownKeys 返回所有的自己属性，不管可枚举还是不可枚举，所以可以遍历出方法属性。
     */
    //静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
    console.log(reducerskeys,'reducerskeys')  //['vote','personal']

    //每次dispatch派发的时候，都会通知返回的reducer执行
    //返回一个合并的reducer
    // +每一次dispatch派发，都会把这个reducer执行
    // +state就是redux容器中的公共状态
    // +action就是派发传递过来的公共对象
    return function reducer(state={},action){
        //把reducers中的每一个小的(每一个模块中的)reducer进行执行
        //把对应模块的状态/action行为对象传递进来,而返回的值替换当前模块的状态
        let nextState = {}
        reducerskeys.forEach(key=>{
            //key:'vote','personal'模块名
            let reducer = reducers[key]
            //reducer:每个模块的reducer
            nextState[key] = reducer(state[key],action)
        })
        return nextState
    }
}

export default combineReducers
