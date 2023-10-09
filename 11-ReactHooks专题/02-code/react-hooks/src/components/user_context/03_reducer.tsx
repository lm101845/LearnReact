import React, { useContext } from 'react'
import { useImmerReducer } from 'use-immer'

type UserType = typeof defaultState
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number } | { type: 'DECREMENT'; payload: number } | { type: 'RESET' }
type ContextType = { user: UserType; dispatch: React.Dispatch<ActionType> }

// 初始状态
const defaultState = { name: 'liulongbin', age: 0 }

// 在 reducer 函数的形参中：
// 第一个参数，永远都是上一次的旧状态
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 的执行')
  console.log(action)

  switch (action.type) {
    case 'UPDATE_NAME':
      prevState.name = action.payload
      break
    case 'INCREMENT':
      prevState.age += action.payload
      break
    case 'DECREMENT':
      prevState.age -= action.payload
      break
    case 'RESET':
      return initAction(defaultState)
    default:
      return prevState
  }
}

// 形参：是初始状态
// 返回值：处理好的初始状态
const initAction = (initState: UserType) => {
  return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}

// 1. 创建 Context 对象
const UserInfoContext = React.createContext<ContextType>({} as ContextType)

// 2. 创建 Wrapper 组件
export const UserInfoContextWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
  //全局的state, dispatch提取出来，放在最外面
  const [state, dispatch] = useImmerReducer(reducer, defaultState, initAction)
  return <UserInfoContext.Provider value={{ user: state, dispatch }}>{children}</UserInfoContext.Provider>
}

export const Father: React.FC = () => {
  const { user: state, dispatch } = useContext(UserInfoContext)

  const changeUserName = () => {
    dispatch({ type: 'UPDATE_NAME', payload: '刘龙彬' })
  }

  return (
    <div>
      <button onClick={changeUserName}>修改用户名</button>
      <p>{JSON.stringify(state)}</p>
      <div className="father">
        <Son1 />
        <Son2 />
      </div>
    </div>
  )
}

const Son1: React.FC = () => {
  const { user, dispatch } = useContext(UserInfoContext)

  const add = () => dispatch({ type: 'INCREMENT', payload: 1 })

  return (
    <div className="son1">
      <p>{JSON.stringify(user)}</p>
      <button onClick={add}>年龄+1</button>
    </div>
  )
}

const Son2: React.FC = () => {
  const { user, dispatch } = useContext(UserInfoContext)

  const sub = () => dispatch({ type: 'DECREMENT', payload: 5 })

  return (
    <div className="son2">
      <p>{JSON.stringify(user)}</p>
      <button onClick={sub}>年龄-5</button>
      <hr />
      <GrandSon />
    </div>
  )
}

const GrandSon: React.FC = () => {
  const { dispatch } = useContext(UserInfoContext)

  const reset = () => dispatch({ type: 'RESET' })

  return (
    <>
      <h3>这是 GrandSon 组件</h3>
      <button onClick={reset}>重置</button>
    </>
  )
}
