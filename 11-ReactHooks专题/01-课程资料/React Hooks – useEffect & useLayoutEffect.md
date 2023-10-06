# React Hooks – useEffect & useLayoutEffect

## 1. useEffect

### 什么是函数的副作用

函数的副作用就是函数**除了返回值外**对**外界环境**造成的**其它影响**，即**与组件渲染无关的操作**。例如**获取数据**、**修改全局变量**、**更新 DOM** 等。

useEffect 是 React 中的 hooks API。通过 useEffect 可以执行一些副作用操作，例如：请求数据、事件监听等。它的语法格式如下：

```js
useEffect(fn, deps?)
```

其中，

- 第一个参数 **fn** 是一个副作用函数，该函数会在**每次渲染完成之后**被调用。

- 第二个参数是**可选的依赖项数组**，这个数组中的每一项内容都会被用来进行**渲染前后的对比**

  - 当依赖项发生变化时，会重新执行 fn 副作用函数
  - 当依赖项没有任何变化时，则不会执行 fn 副作用函数

#### useEffect 的执行时机

#### **情况一：没有第2个参数——ComponetDidMount + ComponentDidUpdate**

> 不管依赖性变不变化都执行，其他变量变化也会执行——不好

如果**没有为 useEffect 指定依赖项数组**，则 Effect 中的副作用函数，会在函数组件**每次**渲染**完成后**执行。例如，我们在下面的代码中，基于 useEffect 获取 h1 元素最新的 innerText：

```tsx
import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  // 注意：这里每次输出的都是上一次的旧值
  // console.log(document.querySelector('h1')?.innerHTML)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // 在组件每次渲染完成之后，都会重新执行 effect 中的回调函数
  useEffect(() => {
    console.log(document.querySelector('h1')?.innerHTML)
  })

  return (
    <>
      <h1>count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

#### 有第2个参数，但deps 为空数组===ComponentDidMount(只执行一次)

如果为 useEffect 指定了一个空数组 `[]` 作为 deps 依赖项，则副作用函数只会在**组件首次渲染完成后**执行**唯一的一次**。**当组件 rerender 的时候不会触发副作用函数的重新执行**。例如下面的代码中，useEffect 中的 console.log() 只会执行1次：

```jsx
import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // 仅在组件首次渲染完成后，会执行 effect 中的回调函数
  useEffect(() => {
    console.log(document.querySelector('h1')?.innerHTML)
  }, [])

  return (
    <>
      <h1>count 值为：{count}</h1>
      <button onClick={add}>+1</button>
    </>
  )
}
```

#### 有第2个参数，且deps 为依赖项数组=ComponentDidMount + 依赖项变化执行

如果想**有条件地**触发副作用函数的**重新执行**，则需要通过 deps 数组指定**依赖项列表**。

React 会在组件每次渲染完成后，对比渲染前后的每一个依赖项是否发生了变化，只要任何一个依赖项发生了变化，都会触发副作用函数的重新执行。否则，如果所有依赖项在渲染前后都没有发生变化，则不会触发副作用函数的重新执行。

下面的例子演示了依赖项的使用：只有当 count 值发生变化时，才会触发 effect 回调函数的重新执行，flag 值的变化不会触发：

```jsx
import React, { useEffect, useState } from 'react'

export const Counter: React.FC = () => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  const add = () => {
    setCount((prev) => prev + 1)
  }

  // 在组件每次渲染完成后，如果 count 值发生了变化，则执行 effect 中的回调
  // 其它状态的变化，不会导致此回调函数的重新执行
  useEffect(() => {
    console.log(document.querySelector('h1')?.innerHTML)
  }, [count])

  return (
    <>
      <h1>count 值为：{count}</h1>
      <p>flag 的值为：{String(flag)}</p>
      <button onClick={add}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
    </>
  )
}
```

> 注意：**不建议**把**对象**作为 useEffect 的**依赖项**，因为 React 使用 [Object.is()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来判断依赖项是否发生变化。

### 如何清理副作用

useEffect 可以返回一个函数，用于清除副作用的回调。语法格式如下：

```jsx
useEffect(() => {
  // 1. 执行副作用操作
  // 2. 返回一个清理副作用的函数
  return () => { /* 在这里执行自己的清理操作 */ }
}, [依赖项])
```

> 实际应用场景：如果当前组件中使用了**定时器**或绑定了**事件监听程序**，可以在返回的函数中清除定时器或解绑监听程序。

### 组件卸载时终止未完成的 Ajax 请求

在父组件 `TestRandomColor` 中，使用布尔值 flag 控制子组件 `RandomColor` 的展示与隐藏：

```jsx
export const TestRandomColor: React.FC = () => {
  const [flag, setFlag] = useState(true)

  return (
    <>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <RandomColor />}
    </>
  )
}
```

在子组件 `RandomColor` 中，通过 `useEffect(fn, [])` 声明一个副作用函数，该副作用函数仅在组件首次渲染完毕后执行。在该副作用函数中，基于 fetch API 请求数据，并且在清理函数中使用 `AbortController` 对象自动终止未完成的 Ajax 请求。示例代码如下：

```jsx
const RandomColor: React.FC = () => {
  const [color, setColor] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch('https://api.liulongbin.top/v1/color', { signal: controller.signal })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setColor(res.data.color)
      })
      .catch((err) => console.log('消息：' + err.message))

    // return 清理函数
    // 清理函数触发的时机有两个：
    // 1. 组件被卸载的时候，会调用
    // 2. 当 effect 副作用函数被再次执行之前，会先执行清理函数
    return () => controller.abort()
  }, [])

  return (
    <>
      <p>color 的颜色值是：{color}</p>
    </>
  )
}
```

### 获取鼠标在网页中移动时的位置

示例代码如下，先声明一个 **MouseInfo** 的子组件，用来监听鼠标的移动并打印鼠标的位置：

```jsx
const MouseInfo: React.FC = () => {
  // 记录鼠标的位置
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // 副作用函数
  useEffect(() => {
    // 1. 要绑定或解绑的 mousemove 事件处理函数
    const mouseMoveHandler = (e: MouseEvent) => {
      console.log({ x: e.clientX, y: e.clientY })
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // 2. 组件首次渲染完毕后，为 window 对象绑定 mousemove 事件
    window.addEventListener('mousemove', mouseMoveHandler)

    // 3. 返回一个清理的函数，在每次组件卸载时，为 window 对象解绑 mousemove 事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])

  return (
    <>
      <p>鼠标的位置：{JSON.stringify(position)}</p>
    </>
  )
}
```

再声明一个 **TestMouseInfo** 的父组件，通过布尔值 flag 控制子组件 **MouseInfo** 的显示或隐藏：

```jsx
export const TestMouseInfo: React.FC = () => {
  // 定义布尔值 flag，控制子组件的显示或隐藏
  const [flag, setFlag] = useState(true)

  return (
    <>
      <h3>父组件</h3>
      {/* 点击按钮，切换 flag 的值 */}
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <MouseInfo />}
    </>
  )
}
```

### 自定义封装鼠标位置的 hook

在 `src` 目录下新建 `hooks/index.ts` 模块，并把刚才获取鼠标位置的代码封装成名为 `useMousePosition` 的自定义 hook，代码如下：

```js
import { useState, useEffect } from 'react'

export const useMousePosition = () => {
  // 记录鼠标的位置
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // 副作用函数
  useEffect(() => {
    // 1. 要绑定或解绑的 mousemove 事件处理函数
    const mouseMoveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    // 2. 组件首次渲染完毕后，为 window 对象绑定 mousemove 事件
    window.addEventListener('mousemove', mouseMoveHandler)

    // 3. 返回一个清理的函数，在每次组件卸载时，为 window 对象解绑 mousemove 事件
    return () => window.removeEventListener('mousemove', mouseMoveHandler)
  }, [])

  return position
}
```

在 **MouseInfo** 组件中，可以导入自己封装的 hook 进行使用：

```jsx
import { useMousePosition } from '@/hooks/index.ts'

const MouseInfo: React.FC = () => {
  // 调用自定义的 hook，获取鼠标的位置信息
  const position = useMousePosition()

  return (
    <>
      <!-- 输出鼠标的位置信息 -->
      <p>鼠标的位置：{JSON.stringify(position)}</p>
    </>
  )
}
```

在 TestMouseInfo 组件中，也可以导入自己封装的 hook 进行使用：

```jsx
import { useMousePosition } from '@/hooks/index.ts'

export const TestMouseInfo: React.FC = () => {
  const [flag, setFlag] = useState(true)
  // 调用自定义的 hook，获取鼠标的位置信息
  const position = useMousePosition()

  return (
    <>
      <!-- 输出鼠标的位置信息 -->
      <h3>父组件 {position.x + position.y}</h3>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      {flag && <MouseInfo />}
    </>
  )
}
```

### 自定义封装秒数倒计时的 hook

功能分析：

1. 用户调用 `useCountDown(5)` 的 hook，可以传递倒计时的秒数，如果未指定秒数则默认值为 10 秒
2. 在 `useCountDown` 中，需要对用户传递进行来的数字进行非法值的判断和处理（处理负数、小数、0）
3. 每隔1秒让秒数 `-1`，并使用一个布尔值记录按钮是否被禁用
4. 以数组的形式，向外返回每次的秒数和当前的禁用状态，例如 `return [count, disabled]`

最终，用户可以按照如下的方式，使用我们封装的 `useCountDown` hook：

```jsx
import React from 'react'
// 1. 导入自定义的 hook
import { useCountDown } from '@/hooks/index.ts'

export const CountDown: React.FC = () => {
  // 2. 调用自定义的 hook
  const [count, disabled] = useCountDown(3)

  return (
    <>
      <!-- 3. 展示倒计时的秒数，并控制按钮的禁用状态 -->
      <button disabled={disabled} onClick={() => console.log('协议生效！')}>
        {disabled ? `请仔细阅读本协议内容（${count} 秒）` : '确认此协议'}
      </button>
    </>
  )
}
```

接下来，我们可以在 `src/hooks/index.ts` 模块中，封装名为 `useCountDown` 的自定义 hook。具体代码如下：

```js
import { useState, useEffect } from 'react'

// TS 类型
type UseCountDown = (seconds: number) => [number, boolean]

export const useCountDown: UseCountDown = (seconds = 10) => {
  // 对外界传递的数值进行非法值处理：
  // 1. 先求绝对值
  // 2. 再对小数进行四舍五入
  // 3. 如果处理的结果为数字 0，则将默认值设为 10
  seconds = Math.round(Math.abs(seconds)) || 10

  // 计数器
  const [count, setCount] = useState(seconds)
  // 倒计时是否结束 disabled 为 false 表示结束，为 true 表示未结束
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (count > 1) {
        setCount((prev) => prev - 1)
      } else {
        setDisabled(false)
      }
    }, 1000)

    // 返回清理函数，再次执行 useEffect 的副作用函数之前，先运行上次 return 的清理函数
    return () => clearTimeout(timerId)
  }, [count])

  // 返回 count 和 disabled 供组件使用
  // 1. count 用来显示倒计时的秒数
  // 2. disabled 用来控制按钮是否禁用 Or 倒计时是否结束
  return [count, disabled]
}
```

### useEffect 的使用注意事项

1. 不要在 useEffect 中改变依赖项的值，会造成**死循环**。
2. 多个**不同功能**的副作用尽量分开声明，不要写到一个 useEffect 中。

## 2. useLayoutEffect

### useLayoutEffect 和 useEffect 的对比

#### 1. 用法相似

useLayoutEffect 和 useEffect 的使用方式很相似：

1. useLayout 接收一个函数和一个依赖项数组作为参数
2. 只有在数组中的依赖项发生改变时才会再次执行副作用函数
3. useLayoutEffect 也可以返回一个清理函数

#### 2. 区别

| hooks 名称      | 执行时机                         | 执行过程                     |
| --------------- | -------------------------------- | ---------------------------- |
| useEffect       | 在浏览器重新绘制屏幕**之后**触发 | 异步执行，不阻塞浏览器绘制   |
| useLayoutEffect | 在浏览器重新绘制屏幕**之前**触发 | 同步执行，阻塞浏览器重新绘制 |

> 注意：React 保证了 `useLayoutEffect` 中的代码以及其中任何计划的状态更新都会在浏览器重新绘制屏幕之前得到处理。

#### 3. 代码示例

点击按钮，把 num 值设置为 0，当页面更新完成后，判断 num 是否等于 0，如果等于 0，则在 useEffect 中把 num 赋值为随机的数字：

```jsx
export const RandomNumber: React.FC = () => {
  const [num, setNum] = useState(Math.random() * 200)

  useEffect(() => {
    if (num === 0) {
      setNum(10 + Math.random() * 200)
    }
  }, [num])

  return (
    <>
      <h1>num 的值是：{num}</h1>
      <button onClick={() => setNum(0)}>重置 num</button>
    </>
  )
}
```

运行上面的代码，我们会发现这串数字会出现闪烁的情况。原因是页面会先将 h1 渲染为 0，然后再渲染成随机的数字，由于更新的很快便出现了闪烁。

为了解决上述问题，可以把 useEffect 替换为 useLayoutEffect：

```jsx
export const RandomNumber: React.FC = () => {
  const [num, setNum] = useState(Math.random() * 200)

  useLayoutEffect(() => {
    if (num === 0) {
      setNum(10 + Math.random() * 200)
    }
  }, [num])

  return (
    <>
      <h1>num 的值是：{num}</h1>
      <button onClick={() => setNum(0)}>重置 num</button>
    </>
  )
}
```

更改完成后再次运行代码，发现数字不再闪烁了。因为点击按钮时，**num 更新为 0，但此时页面不会渲染**，而是等待 useLayoutEffect 内部状态修改后才会更新页面，所以不会出现闪烁。