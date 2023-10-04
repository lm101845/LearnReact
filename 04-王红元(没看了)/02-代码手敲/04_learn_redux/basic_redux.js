/**
 * @Author liming
 * @Date 2022/11/14 19:41
 **/

//demo中导入redux不要使用ES6方式
const redux = require("redux");

const initialState = {
    counter: 0
}
//reducer(必须要是纯函数)
function reducer(state=initialState,action){
    switch (action.type){
        case "INCREAMENT":
            return {...state,counter:state.counter + 1}
            //一定要这样写，不能直接修改state的值
        case "DECREAMENT":
            return {...state,counter:state.counter - 1}
        case "ADD_NUMBER":
            return {...state,counter:state.counter + action.num}
        case "SUB_NUMBER":
            return {...state,counter:state.counter - action.num}
        default:
            return state;
    }
}
//store(创建的时候需要传入一个reducer)
const store = redux.createStore(reducer)
//redux.createStore()返回值store是一个对象，它有如下属性，这些属性基本都是函数
/**
 *   return {
 *     dispatch,
 *     subscribe,
 *     getState,
 *     replaceReducer,
 *     [$$observable]: observable,
 *   }
 */

//actions
const action1 = {type:"INCREAMENT"};
const action2 = {type:"DECREAMENT"};
const action3 = {type:"ADD_NUMBER",num:5}
const action4 = {type:"SUB_NUMBER",num:12}

//订阅store的修改——注意：订阅一定要放在action的前面，否则你都派发完了，我就订阅不到了
store.subscribe(()=>{
    console.log('state发生了改变',store.getState().counter)
})


//派发action——一旦派发action,reducer函数就会自动执行
store.dispatch(action1)
store.dispatch(action2)
store.dispatch(action2)
store.dispatch(action3)
store.dispatch(action4)

