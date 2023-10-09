/**
 * @Author liming
 * @Date 2023/10/6 22:08
 **/

/**
 * useReducer 是 useState 的替代方案。当 useState 不能很好的满足需要的时候，useReducer 可能会解决我们的问题。
 * const [state, dispatch] = useReducer(reducer, initialArg, init);
 * 第一个参数 reducer 是函数 (state, action) => newState，接受当前的 state 和操作行为。第二个参数 initialArg 是状态初始值。第三个参数 init 是懒惰初始化函数。
 *
 */
import React, {useReducer} from 'react'
import {useImmerReducer} from "use-immer";

type UserType = typeof initState;
type ActionType = { type: 'UPDATE_NAME', payload: string }
    | { type: 'INCREMENT'; payload: number }
    | { type: 'DECREMENT'; payload: number }
    | { type: 'DECREMENT'; payload: number } | { type: 'RESET' }

// const initState = {name: '李白', age: -8}
const initState = {name: 'libai', age: 18}
//初始状态

//initAction是对初始状态进行校验的函数
// 形参：是初始状态
// 返回值：处理好的初始状态
const initAction = (initState: UserType) => {
    return {
        ...initState, age: Math.round(Math.abs(initState.age)) || 18
    }
}

// 形参：是初始状态
// 返回值：处理好的初始状态
const reducer = (preState: UserType, action: ActionType): UserType => {
    //第一次进入组件的时候，不会触发reducer函数的执行
    console.log('触发了reducer的执行')
    console.log(action, '接收dispatch传过来的新数据')
    //这个传过来的payload数据，reducer要怎么接收呢？使用reducer函数的第二个参数进行接收
    //这个action，就是dispatch传过来的数据
    switch (action.type) {
        case 'UPDATE_NAME':
            return {...preState, name: action.payload}
            // preState.name = action.payload
        // 添加 INCREMENT 的 case 匹配
        case 'INCREMENT':
            return {...preState, age: preState.age + action.payload}
            // preState.age += action.payload
        // 添加 DECREMENT 的 case 匹配
        case 'DECREMENT':
            return {...preState, age: preState.age - action.payload}
            // preState.age -= action.payload
        case 'RESET':
            return {...initState}
            // return initState
        //default用于兜底，以防没有匹配到
        default:
            return preState
    }
    // return preState
}
// 在 reducer 函数的形参中：
// 第一个参数，永远都是上一次的旧状态


export const Father: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initState, initAction)
    // const [state, dispatch] = useImmerReducer(reducer, initState, initAction)
    //dispatch函数的作用就是触发reducer的重新执行的
    /**
     * 修改 reducer 函数中的业务逻辑，`case` 代码块中不再需要 return 不可变的新对象了，
     * 只需要在 prevState 上进行修改即可。**Immer 内部会复制并返回新对象**，因此降低了用户的心智负担。
     */
    console.log(state, '打印state')

    const changeUserName = () => {
        // state.name = "李白"
        // console.log(state,'其实已经改了，但是页面上没有发生任何变化——页面没有成功渲染')
        // 注意：这种用法是错误的，因为不能直接修改 state 的值
        // 因为存储在 useReducer 中的数据都是“不可变”的！
        // 要想修改 useReducer 中的数据，必须触发 reducer 函数的重新计算，
        // 根据 reducer 形参中的旧状态对象（initState），经过一系列处理，返回一个“全新的”状态对象
        //直接通过state.xx的方法修改是不行的！！！它不是响应式的，React监听不到组件的变化

        // dispatch()
        //dispatch这个函数可以触发reducer的执行

        dispatch({type: 'UPDATE_NAME', payload: '杜甫'})
        //type是必须要有的属性,用来告诉【reducer函数】，这次的操作类型是什么
        //payload是表示我们要传什么数据进去(新数据)，表示载荷
        //这个传过来的payload数据，reducer要怎么接收呢？使用reducer函数的第二个参数进行接收
    }
    return <div>
        <button onClick={changeUserName}>修改用户名</button>
        <p>{JSON.stringify(state)}</p>
        <div className="father">
            <Son1 {...state} dispatch={dispatch}/>
            <Son2 {...state} dispatch={dispatch}/>
        </div>
    </div>
}

const Son1: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
    const {dispatch, ...user} = props
    //除了dispatch方法外，其他都保存在user对象里面
    const add = () => dispatch({type: 'INCREMENT', payload: 1})
    return (
        <div className="son1">
            <p>用户信息：</p>
            <p>{JSON.stringify(props)}</p>
            <button onClick={add}>子组件自增</button>
        </div>
    )
}

const Son2: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
    const {dispatch, ...user} = props
    const sub = () => dispatch({type: 'DECREMENT', payload: 5})
    return (
        <div className="son2">
            <p>用户信息：</p>
            <p>{JSON.stringify(props)}</p>
            <button onClick={sub}>-5</button>
            <hr/>
            <GrandSon dispatch={dispatch}/>
        </div>
    )
}

const GrandSon: React.FC<{ dispatch: React.Dispatch<ActionType> }> = (props) => {
    const reset = () => props.dispatch({type: 'RESET'})

    return (
        <>
            <h3>这是 GrandSon 组件</h3>
            <button onClick={reset}>重置</button>
        </>
    )
}
