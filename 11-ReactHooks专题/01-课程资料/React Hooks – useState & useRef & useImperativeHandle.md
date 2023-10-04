# ReactHooks笔记

## 1. 准备工作

1. 基于 [Vite](https://cn.vitejs.dev/) 创建 React + TypeScript 的项目，具体创建项目的步骤，请参考 Vite 官方文档。

2. 在 Vite 项目中配置 `@` 路径提示

   1. 安装 node 的类型声明：

      ```bash
      npm i -D @types/node
      ```

   2. 配置 `vite.config.ts` 文件：

      ```js
      // 1. 以 ES6 模块化的方式，从 Node 的 path 模块中，导入 join 函数
      import { join } from 'path'
      
      // https://vitejs.dev/config/
      export default defineConfig({
      plugins: [react()],
      // 2. 在 resolve.alias 对象下，配置 @ 的指向路径
      resolve: {
        alias: {
          '@': join(__dirname, './src/')
        }
      }
      })
      ```

   3. 配置 `tsconfig.json` 文件，在 `compilerOptions` 节点下，新增 `"baseUrl": "."` 和 `"paths": { "@/*": [ "src/*" ] }` 两项：

      ```js
      {
          "compilerOptions": {
            /* 新增以下两个配置项，分别是 baseUrl 和 paths */
            "baseUrl": ".",
            "paths": {
              "@/*": [
                "src/*"
              ]
            },
            "target": "ES2020",
            "useDefineForClassFields": true,
            "lib": [
              "ES2020",
              "DOM",
              "DOM.Iterable"
            ],
            "module": "ESNext",
            "skipLibCheck": true,
            /* Bundler mode */
            "moduleResolution": "bundler",
            "allowImportingTsExtensions": true,
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react-jsx",
            /* Linting */
            "strict": true,
            "noUnusedLocals": true,
            "noUnusedParameters": true,
            "noFallthroughCasesInSwitch": true
          },
          "include": [
            "src"
          ],
          "references": [
            {
              "path": "./tsconfig.node.json"
            }
          ]
      }
      ```

## 2. useState

### 基本用法

**useState**，能让函数组件拥有自己的状态，因此，它是一个管理状态的 hooks API。通过 useState 可以实现状态的初始化、读取、更新。基本语法格式如下：

```jsx
const [状态名, set函数] = useState(初始值)
```

其中：状态名所代表的数据，可以被函数组件使用；如果要修改状态名所代表的数据，需要调用 **set 函数** 进行修改。例如：

```jsx
import { useState } from 'react'

export function Count() {
  // 定义状态 count，其初始值为 0
  // 如果要修改 count 的值，需要调用 setCount(新值) 函数
  const [count, setCount] = useState(0)

  return (
    <>
      <!-- 在函数组件内，使用名为 count 的状态 -->
      <h1>当前的 count 值为：{count}</h1>
      <!-- 点击按钮时，调用 setCount() 函数，为 count 赋新值 -->
      <button onClick={() => setCount(count + 1)}>+1</button>
    </>
  )
}
```

### 状态变化时，会触发函数组件的重新执行

在函数组件中使用 setState 定义状态之后，每当状态发生变化，都会触发函数组件的重新执行，**从而根据最新的数据更新渲染 DOM 结构**。例如：

```jsx
import { useState } from 'react'

export function Count() {
  // 定义状态 count，其初始值为 0
  // 如果要修改 count 的值，需要调用 setCount(新值) 函数
  const [count, setCount] = useState(0)

  // 每次 count 值发生变化，都会打印下面的这句话：
  console.log('组件被重新渲染了')

  const add = () => {
    setCount(count + 1)
  }

  return (
    <>
      <!-- 在函数组件内，使用名为 count 的状态 -->
      <h1>当前的 count 值为：{count}</h1>
      <!-- 点击按钮时，在 add 处理函数中，调用 setCount() 函数，为 count 赋新值 -->
      <button onClick={add}>+1</button>
    </>
  )
}
```

> 注意：当函数式组件被重新执行时，不会重复调用 useState() 给数据赋初值，而是会复用上次的 state 值。

### 以函数的形式为状态赋初始值

在使用 useState 定义状态时，除了可以**直接给定初始值**，还可以通过**函数返回值**的形式，为状态赋初始值，语法格式如下：

```jsx
const [value, setValue] = useState(() => 初始值)
```

例如：

```jsx
export const DateCom: React.FC = () => {
  // const [date] = useState({ year: 2023, month: 9, day: 11 })
  const [date, setDate] = useState(() => {
    const dt = new Date()
    return { year: dt.getFullYear(), month: dt.getMonth() + 1, day: dt.getDate() }
  })

  return (
    <>
      <h1>今日信息：</h1>
      <p>年份：{date.year}年</p>
      <p>月份：{date.month}月</p>
      <p>日期：{date.day}日</p>
    </>
  )
}
```

> 注意：以函数的形式为状态赋初始值时，只有组件首次被渲染才会执行 fn 函数；当组件被更新时，会以更新前的值作为状态的初始值，赋初始值的函数不会执行。

### useState 是异步变更状态的

调用 useState() 会返回一个**变更状态的函数**，这个函数内部是以**异步的形式**修改状态的，所以修改状态后**无法立即拿到最新的状态**，例如：

```jsx
export const Count: React.FC = () => {
  const [count, setCount] = useState(() => 0)

  const add = () => {
    // 1. 让数值自增+1
    setCount(count + 1)
    // 2. 打印 count 的值
    console.log(count)
  }

  return (
    <>
      <h1>当前的 count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

在上述代码的第8行，打印出来的 count 值是更新前的旧值，而非更新后的新值。证明 **useState** 是异步变更状态的。

### 结合 useEffect 监听状态的变化

为了能够监听到状态的变化，react 提供了 **useEffect** 函数。**它能够监听依赖项状态的变化，并执行对应的回调函数**。基本语法格式如下：

```js
useEffect(() => { /* 依赖项变化时，要触发的回调函数 */ }, [依赖项])
```

例如：

```jsx
export const Count: React.FC = () => {
  const [count, setCount] = useState(() => 0)

  const add = () => {
    setCount(count + 1)
  }

  // 当 count 变化后，会触发 useEffect 指定的回调函数
  useEffect(() => {
    console.log(count)
  }, [count])

  return (
    <>
      <h1>当前的 count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

> 注意：useEffect 也是 React 提供的 Hooks API，后面的课程中会对它进行详细的介绍。

### 注意事项

#### 1. 更新对象类型的值

如果要更新对象类型的值，并触发组件的重新渲染，则必须使用**展开运算符**或**Object.assign()****生成一个新对象**，用新对象覆盖旧对象，才能正常触发组件的重新渲染。示例代码如下：

```jsx
export const UserInfo: React.FC = () => {
  const [user, setUser] = useState({
    name: 'zs',
    age: 12,
    gender: '男'
  })

  const updateUserInfo = () => {
    user.name = 'Jesse Pinkman'
    // 下面的写法是错误的，因为 set 函数内部，会对更新前后的值进行对比；
    // 由于更新前后的 user，原值的引用和新值的引用相同，
    // 所以 react 认为值没有发生变化，不会触发组件的重新渲染。
    // setUser(user)

    // 解决方案：用新对象的引用替换旧对象的引用，即可正常触发组件的重新渲染。
    setUser({ ...user })
    // setUser(Object.assign({}, user))
  }

  return (
    <>
      <h1>用户信息：</h1>
      <p>姓名：{user.name}</p>
      <p>年龄：{user.age}</p>
      <p>性别：{user.gender}</p>

      <button onClick={updateUserInfo}>更新用户信息</button>
    </>
  )
}
```

#### 2. 解决值更新不及时的 Bug

当连续多次**以相同的操作**更新状态值时，React 内部会对传递过来的新值进行比较，如果值相同，则会屏蔽后续的更新行为，从而防止组件频繁渲染的问题。这虽然提高了性能，但也带来了一个使用误区，例如：

```jsx
export const Count: React.FC = () => {
  const [count, setCount] = useState(() => 0)

  const add = () => {
    // 1. 希望让 count 值从 0 自增到 1
    setCount(count + 1)
    // 2. 希望让 count 值从 1 自增到 2
    setCount(count + 1)
  }

  return (
    <>
      <h1>当前的 count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

经过测试，我们发现上述代码执行的结果，只是让 count 从 0 变成了 1，最终的 count 值并不是 2。Why？

因为 `setCount` 是异步地更新状态值的，所以前后两次调用 `setCount` 传递进去的新值都是 1。React 内部如果遇到两次相同的状态，则会默认阻止组件再次更新。

为了解决上述的问题，我们可以使用**函数的方式**给状态赋新值。当函数执行时才通过函数的形参，拿到当前的状态值，并基于它返回新的状态值。示例代码如下：

```jsx
export const Count: React.FC = () => {
  const [count, setCount] = useState(() => 0)

  const add = () => {
    // 传递了更新状态的函数进去
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <>
      <h1>当前的 count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

#### 3. 使用 setState 模拟组件的强制刷新

在函数组件中，我们可以通过 useState 来**模拟 forceUpdate 的强制刷新操作**。因为只要 useState 的状态发生了变化，就会触发函数组件的重新渲染，从而达到强制刷新的目的。具体的代码示例如下：

```jsx
export const FUpdate: React.FC = () => {
  const [, forceUpdate] = useState({})

  // 每次调用 onRefresh 函数，都会给 forceUpdate 传递一个新对象
  // 从而触发组件的重新渲染
  const onRefresh = () => forceUpdate({})

  return (
    <>
      <button onClick={onRefresh}>点击强制刷新 --- {Date.now()}</button>
    </>
  )
}
```

> 注意：因为每次传入的对象的地址不同，所以一定会使组件刷新。

## 3. useRef

useRef 函数返回一个可变的 ref 对象，该对象只有一个 **current** 属性。可以在调用 useRef 函数时为其指定初始值。并且这个返回的 ref 对象在组件的整个生命周期内保持不变。语法格式如下：

```js
// 1. 导入 useRef
import { useRef } from 'react'
// 2. 调用 useRef 创建 ref 对象
const refObj = useRef(初始值)
// 3. 通过 ref.current 访问 ref 中存储的值
console.log(refObj.current)
```

useRef 函数用来解决以下两个问题：

1. 获取 **DOM 元素**或**子组件**的实例对象；
2. 存储渲染周期之间**共享的数据**；

### 获取 DOM元素的实例

下面的代码演示了如何获取 Input 元素的实例，并调用其 DOM API。

```jsx
import React, { useRef } from 'react'

export const InputFocus: React.FC = () => {
  // 1. 创建 ref 引用
  const iptRef = useRef<HTMLInputElement>(null)

  const getFocus = () => {
    // 3. 调用 focus API，让文本框获取焦点
    iptRef.current?.focus()
  }

  return (
    <>
      {/* 2. 绑定 ref 引用 */}
      <input type="text" ref={iptRef} />
      <button onClick={getFocus}>点击获取焦点</button>
    </>
  )
}
```

### 存储渲染周期之间的共享数据

基于 useRef 创建名为 `prevCountRef` 的数据对象，用来存储上一次的旧 count 值。每当点击按钮触发 count 自增时，都把最新的旧值赋值给 `prevCountRef.current` 即可：

```jsx
export const Counter: React.FC = () => {
  // 默认值为 0
  const [count, setCount] = useState(0)

  // 默认值为 undefined
  const prevCountRef = useRef<number>()

  const add = () => {
    // 点击按钮时，让 count 值异步 +1
    setCount((c) => c + 1)
    // 同时，把 count 所代表的旧值记录到 prevCountRef 中
    prevCountRef.current = count
  }

  return (
    <>
      <h1>
        新值是：{count}，旧值是：{prevCountRef.current}
      </h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

### 注意事项

#### 1. 组件 rerender 时 useRef 不会被重复初始化

在 **RefTimer** 组件中，点击 **+1 按钮**，会让 count 值自增，**从而触发 RefTimer 组件的 rerender**。但是，我们发现 RefTimer 组件中的时间戳保持不变，这说明组件每次渲染，**不会重复调用 useRef 函数进行初始化**。示例代码如下：

```jsx
export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  console.log('组件被渲染了')

  return (
    <>
      <h3>
        count值是：{count}, 时间戳是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
    </>
  )
}
```

#### 2. ref.current 变化时不会造成组件的 rerender

点击**给 ref 赋新值**的按钮时，为 `time.current` 赋新值，执行的结果是：

1. 终端中输出了最新的 `time.current` 的值
2. 没有触发 **RefTimer** 组件的 rerender

这证明了 ref.current 变化时不会造成组件的 rerender，示例代码如下：

```jsx
export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件被渲染了')

  return (
    <>
      <h3>
        count值是：{count}, 时间戳是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={updateTime}>给ref赋新值</button>
    </>
  )
}
```

#### 3. ref.current 不能作为其它 Hooks 的依赖项

由于 ref.current 值的变化不会造成组件的 rerender，而且 React 也不会跟踪 ref.current 的变化，因此 ref.current 不可以作为其它 hooks（useMemo、useCallback、useEffect 等） 的依赖项。

```jsx
export const RefTimer: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件被渲染了')

  useEffect(() => {
    console.log('time 的值发生了变化：' + time.current)
  }, [time.current])

  return (
    <>
      <h3>
        count值是：{count}, 时间戳是：{time.current}
      </h3>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={updateTime}>给ref赋新值</button>
    </>
  )
}
```

在上面的代码中，组件首次渲染完成后，必然会触发一次 useEffect 的执行。但是，当 time.current 发生变化时，并不会触发 useEffect 的重新执行。因此，不能把 ref.current 作为其它 hooks 的依赖项。

## 4. forwardRef

ref 的作用是获取实例，但由于函数组件不存在实例，因此无法通过 ref 获取函数组件的实例引用。而 `React.forwardRef` 就是用来解决这个问题的。

`React.forwardRef` 会创建一个 React 组件，这个组件能够将其接收到的 ref 属性转发到自己的组件树。

### 无法直接使用 ref 引用函数式组件

在下面的例子中，父组件 **Father** 想通过 ref 引用子组件 **Child**，此时代码会报错，因为函数式组件没有实例对象，无法被直接引用：

```jsx
// 父组件
export const Father: React.FC = () => {
  const childRef = useRef()

  return (
    <>
      <h1>Father 父组件</h1>
      <hr />
      <!-- 下面这行代码中的 ref 使用不正确，因为 Child 组件是函数式组件，无法被直接引用 -->
      <Child ref={childRef} />
    </>
  )
}
```

Child 组件的定义如下：

```jsx
// 子组件（实现点击按钮，数值加减的操作）
const Child: React.FC = () => {
  const [count, setCount] = useState(0)

  const add = (step: number) => {
    setCount((prev) => (prev += step))
  }

  return (
    <>
      <h3>Child 子组件 {count}</h3>
      <button onClick={() => add(-1)}>-1</button>
      <button onClick={() => add(1)}>+1</button>
    </>
  )
}
```

注意：上面的代码无法正常运行，会在终端提示如下的 Warning 警告：

```
Warning: 
Function components cannot be given refs. Attempts to access this ref will fail. 
Did you mean to use React.forwardRef()?
```

> 错误提示中有解决此问题的关键提示：Did you mean to use **React.forwardRef()**?

### forwardRef 的基本使用

在使用函数组件时，我们无法直接使用 ref 引用函数式组件，下面的代码会产生报错：

```jsx
const childRef = useRef(null)
return <Child ref={inputRef} />
```

因为默认情况下，你自己的组件不会暴露它们内部 DOM 节点的 ref。

正确的方法是使用 `React.forwardRef()` 把函数式组件包装起来，例如 Child 子组件的代码如下：

```jsx
// 被包装的函数式组件，第一个参数是 props，第二个参数是转发过来的 ref
const Child = React.forwardRef((props, ref) => {
  // 省略子组件内部的具体实现
})
```

然后，在父组件 Father 中，就可以给子组件 Child 绑定 ref 了：

```jsx
// 父组件
export const Father: React.FC = () => {
  const childRef = useRef()

  // 按钮的点击事件处理函数
  const onShowRef = () => {
    console.log(childRef.current)
  }

  return (
    <>
      <h1>Father 父组件</h1>
      {/* 点击按钮，打印 ref 的值 */}
      <button onClick={onShowRef}>show Ref</button>
      <hr />
      <Child ref={childRef} />
    </>
  )
}
```

> 注意：此时父组件 Father 中获取到的 ref.current 是 null，因为子组件 Child 没有向外暴露任何自己内部的东西。

## 5. useImperativeHandle

直接使用 ref 获取 DOM 实例，会全面暴露 DOM 实例上的 API，从而导致外部使用 ref 时有更大的自由度。在实际开发中，我们应该严格控制 ref 的暴露颗粒度，控制它能调用的方法，只向外暴露主要的功能函数，其它功能函数不暴露。

React 官方提供 useImperativeHandle 的目的，就是让你在使用 ref 时可以自定义暴露给外部组件哪些功能函数或属性。

它的语法结构如下：

```js
useImperativeHandle(通过forwardRef接收到的父组件的ref对象, () => 自定义ref对象, [依赖项数组])
```

其中，第三个参数（依赖项数组）是可选的。

### useImperativeHandle 的基本使用

在被 `React.forwardRef()` 包裹的组件中，需要结合 `useImperativeHandle` 这个 hooks API，向外按需暴露子组件内的成员：

```jsx
import React, { useRef, useState, useImperativeHandle } from 'react'

// 子组件
const Child = React.forwardRef((_, ref) => {
  const [count, setCount] = useState(0)

  const add = (step: number) => {
    setCount((prev) => (prev += step))
  }

  // 1. 向外暴露一个空对象
  // 2. useImperativeHandle(ref, () => ({}))
  // 向外暴露一个对象，其中包含了 name 和 age 两个属性
  useImperativeHandle(ref, () => ({
    name: 'liulongbin',
    age: 22
  }))

  return (
    <>
      <h3>Child 子组件 {count}</h3>
      <button onClick={() => add(-1)}>-1</button>
      <button onClick={() => add(1)}>+1</button>
    </>
  )
})
```

### 基于 useImperativeHandle 按需向外暴露成员

在子组件中，向外暴露 count 和 setCount 这两个成员：

```jsx
// 子组件
const Child = React.forwardRef((_, ref) => {
  const [count, setCount] = useState(0)

  const add = (step: number) => {
    setCount((prev) => (prev += step))
  }

  // 向外暴露 count 的值和 setCount 函数
  useImperativeHandle(ref, () => ({
    count,
    setCount
  }))

  return (
    <>
      <h3>Child 子组件 {count}</h3>
      <button onClick={() => add(-1)}>-1</button>
      <button onClick={() => add(1)}>+1</button>
    </>
  )
})
```

在父组件中，添加一个重置按钮，当点击重置按钮时，调用 ref 向外暴露的 setCount 函数，把子组件内部的 count 重置为 0。示例代码如下：

```jsx
// 父组件
export const Father: React.FC = () => {
  const childRef = useRef<{ count: number; setCount: (value: number) => void }>(null)

  // 按钮的点击事件处理函数
  const onShowRef = () => {
    console.log(childRef.current)
  }

  // 重置按钮的点击事件处理函数
  const onReset = () => {
    childRef.current?.setCount(0)
  }

  return (
    <>
      <h1>Father 父组件</h1>
      {/* 点击按钮，打印 ref 的值 */}
      <button onClick={onShowRef}>show Ref</button>
      {/* 点击按钮，重置数据为 0 */}
      <button onClick={onReset}>重置</button>
      <hr />
      <Child ref={childRef} />
    </>
  )
}
```

### 控制成员暴露的粒度

在 Child 子组件中，我们希望对外暴露一个重置 `count` 为 0 的函数，而不希望直接把 `setCount()` 暴露出去，因为父组件调用 `setCount()` 时可以传任何数值。因此，我们可以基于 useImperativeHandle，向外提供一个 `reset()` 函数而非直接把 `setCount()` 暴露出去：

```jsx
// 子组件
const Child = React.forwardRef((_, ref) => {
  const [count, setCount] = useState(0)

  const add = (step: number) => {
    setCount((prev) => (prev += step))
  }

  // 向外暴露 count 的值和 reset 函数
  useImperativeHandle(ref, () => ({
    count,
    // 在组件内部封装一个重置为 0 的函数，API 的粒度更小
    reset: () => setCount(0)
  }))

  return (
    <>
      <h3>Child 子组件 {count}</h3>
      <button onClick={() => add(-1)}>-1</button>
      <button onClick={() => add(1)}>+1</button>
    </>
  )
})
```

在父组件中，调用 ref.current.reset() 即可把数据重置为 0：

```jsx
// 父组件
export const Father: React.FC = () => {
  const childRef = useRef<{ count: number; reset: () => void }>(null)

  // 按钮的点击事件处理函数
  const onShowRef = () => {
    console.log(childRef.current)
  }

  // 重置按钮的点击事件处理函数
  const onReset = () => {
    childRef.current?.reset()
  }

  return (
    <>
      <h1>Father 父组件</h1>
      {/* 点击按钮，打印 ref 的值 */}
      <button onClick={onShowRef}>show Ref</button>
      {/* 点击按钮，重置数据为 0 */}
      <button onClick={onReset}>重置</button>
      <hr />
      <Child ref={childRef} />
    </>
  )
}
```

### useImperativeHandle 的第三个参数

再来回顾一下 useImperativeHandle 的参数项：

```js
useImperativeHandle(ref, createHandle, [deps])
```

- 第一个参数为父组件传递的 ref。
- 第二个参数是一个函数，返回的对象会自动绑定到 ref 上。 即子组件可以将自己内部的方法或者值通过 useImperativeHandle 添加到父组件中 useRef 定义的对象中。
- 第三个参数是**函数依赖的值**（可选）。若 createHandle 函数中**使用到了子组件内部定义的变量**，则还需要将该变量作为**依赖变量**成为 useImperativeHandle 的第3个参数。

其中，第三个参数有3种用法：

1. **空数组**：只在子组件首次被渲染时，执行 `useImperativeHandle` 中的 fn 回调，从而把 return 的对象作为父组件接收到的 ref。例如：

   ```jsx
   import React, { useState, useImperativeHandle } from 'react'
   
   // 子组件
   const Child = React.forwardRef((_, ref) => {
    const [count, setCount] = useState(0)
   
    const add = (step: number) => {
      setCount((prev) => (prev += step))
    }
   
    // 向外暴露 count 的值和 reset 函数
    useImperativeHandle(
      ref,
      () => {
        // 这个 console 只执行1次，哪怕 count 值更新了，也不会重新执行
        // 导致的结果是：外界拿到的 count 值，永远是组件首次渲染时的初始值 0
        console.log('执行了 useImperativeHandle 的回调')
        return {
          count,
          reset: () => setCount(0)
        }
      },
      []
    )
   
    return (
      <>
        <h3>Child 子组件 {count}</h3>
        <button onClick={() => add(-1)}>-1</button>
        <button onClick={() => add(1)}>+1</button>
      </>
    )
   })
   ```

2. **依赖项数组**：子组件首次被渲染时，会依赖项改变时，会执行 `useImperativeHandle` 中的 fn 回调，从而让父组件通过 ref 能拿到依赖项的新值。例如：

   ```jsx
   import React, { useState, useImperativeHandle } from 'react'
   
   // 子组件
   const Child = React.forwardRef((_, ref) => {
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)
   
    const add = (step: number) => {
      setCount((prev) => (prev += step))
    }
   
    // 向外暴露 count 的值和 reset 函数
    useImperativeHandle(
      ref,
      () => {
        // 每当依赖项 count 值变化，都会触发这个回调函数的重新执行
        // 因此，父组件能拿到变化后的最新的 count 值
        console.log('执行了 useImperativeHandle 的回调')
        return {
          count,
          reset: () => setCount(0)
        }
      },
      // 注意：只有 count 值变化，才会触发回调函数的重新执行
      // flag 值的变化，不会导致回调函数的重新执行，因为 flag 没有被声明为依赖项
      [count]
    )
   
    return (
      <>
        <h3>Child 子组件 {count}</h3>
        <p>flag 的值是：{String(flag)}</p>
        <button onClick={() => add(-1)}>-1</button>
        <button onClick={() => add(1)}>+1</button>
        {/* 点击按钮，切换布尔值 */}
        <button onClick={() => setFlag((boo) => !boo)}>Toggle</button>
      </>
    )
   })
   ```

3. **省略依赖项数组**（省略第三个参数）：此时，组件内任何 state 的变化，都会导致 `useImperativeHandle` 中的回调的重新执行。示例代码如下：

   ```jsx
   import React, { useState, useImperativeHandle } from 'react'
   
   // 子组件
   const Child = React.forwardRef((_, ref) => {
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)
   
    const add = (step: number) => {
      setCount((prev) => (prev += step))
    }
   
    // 向外暴露 count 的值和 reset 函数
    useImperativeHandle(ref, () => {
      // 只要组件内的任何 state 发生变化，都会触发回调函数的重新执行
      console.log('执行了 useImperativeHandle 的回调')
      return {
        count,
        reset: () => setCount(0)
      }
    })
   
    return (
      <>
        <h3>Child 子组件 {count}</h3>
        <p>flag 的值是：{String(flag)}</p>
        <button onClick={() => add(-1)}>-1</button>
        <button onClick={() => add(1)}>+1</button>
        {/* 点击按钮，切换布尔值 */}
        <button onClick={() => setFlag((boo) => !boo)}>Toggle</button>
      </>
    )
   })
   ```

> 陷阱1：**不要滥用 ref。** 你应当仅在你没法通过 prop 来表达 *命令式* 行为的时候才使用 ref：例如，滚动到指定节点、聚焦某个节点、触发一次动画，以及选择文本等等。



> 陷阱2：**如果可以通过 prop 实现，那就不应该使用 ref**。例如，你不应该从一个 `Model` 组件暴露出 `{open, close}` 这样的命令式句柄，最好是像 `<Modal isOpen={isOpen} />` 这样，将 `isOpen` 作为一个 prop。[副作用](https://zh-hans.react.dev/learn/synchronizing-with-effects) 可以帮你通过 prop 来暴露一些命令式的行为。

