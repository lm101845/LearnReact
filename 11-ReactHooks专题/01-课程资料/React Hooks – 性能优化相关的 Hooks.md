# React Hooks – 性能优化相关的 Hooks

## 1. React.memo

当父组件被重新渲染的时候，也会触发子组件的重新渲染，这样就多出了无意义的性能开销。如果子组件的状态没有发生变化，则子组件是不需要被重新渲染的。

在 React Hooks 中，我们可以使用 `React.memo` 来解决上述的问题，从而达到提高性能的目的。

`React.memo` 的语法格式如下：

```js
const 组件 = React.memo(函数式组件)
```

例如，在下面的代码中，父组件声明了 `count` 和 `flag` 两个状态，子组件依赖于父组件通过 props 传递的 `num`。当父组件修改 flag 的值时，会导致子组件的重新渲染：

```tsx
import React, { useEffect, useState } from 'react'

// 父组件
export const Father: React.FC = () => {
  // 定义 count 和 flag 两个状态
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  return (
    <>
      <h1>父组件</h1>
      <p>count 的值是：{count}</p>
      <p>flag 的值是：{String(flag)}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}

// 子组件：依赖于父组件通过 props 传递进来的 num
export const Son: React.FC<{ num: number }> = ({ num }) => {
  useEffect(() => {
    console.log('触发了子组件的渲染')
  })
  return (
    <>
      <h3>子组件 {num}</h3>
    </>
  )
}
```

我们使用 `React.memo(函数式组件)` 将子组件包裹起来，只有子组件依赖的 props 发生变化的时候，才会触发子组件的重新渲染。示例代码如下：

```tsx
// 子组件：依赖于父组件通过 props 传递进来的 num
export const Son: React.FC<{ num: number }> = React.memo(({ num }) => {
  useEffect(() => {
    console.log('触发了子组件的渲染')
  })
  return (
    <>
      <h3>子组件 --- {num}</h3>
    </>
  )
})
```

## 2. useMemo

### 1. 问题引入

进一步改造前面的案例：我们希望在 `Father` 组件中添加一个“计算属性”，根据 flag 值的真假，动态返回一段文本内容，并把计算的结果显示到页面上。示例代码如下：

```tsx
// 父组件
export const Father: React.FC = () => {
  // 定义 count 和 flag 两个状态
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  // 根据布尔值进行计算，动态返回内容
  const tips = () => {
    console.log('触发了 tips 的重新计算')
    return flag ? <p>哪里贵了，不要睁着眼瞎说好不好</p> : <p>这些年有没有努力工作，工资涨没涨</p>
  }

  return (
    <>
      <h1>父组件</h1>
      <p>count 的值是：{count}</p>
      <p>flag 的值是：{String(flag)}</p>
      {tips()}
      <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
      <button onClick={() => setFlag((prev) => !prev)}>Toggle</button>
      <hr />
      <Son num={count} />
    </>
  )
}
```

代码编写完毕后，我们点击父组件中的 **+1 按钮**，发现 count 在自增，而 flag 的值不会发生变化。此时也会触发 `tips` 函数的重新执行，这就造成了性能的浪费。我们希望如果 `flag` 没有发生变化，则避免 `tips` 函数的重新计算，从而优化性能。此时需要用到 React Hooks 提供的 **useMemo** API。

### 2. useMemo 的语法格式

useMemo 的语法格式如下：

```js
const memorizedValue = useMemo(cb, array)

const memoValue = useMemo(() => {
  return 计算得到的值
}, [value]) // 表示监听 value 的变化
```

其中：

1. cb：这是一个函数，用于处理计算的逻辑，必须使用 return 返回计算的结果
2. array：这个数组中存储的是依赖项，只要依赖项发生变化，都会触发 cb 的重新执行。使用 array 需要注意以下几点
   - 不传数组，每次更新都会重新计算
   - 空数组，只会计算一次
   - 依赖对应的值，对应的值发生变化时会重新执行 cb

### 3. 使用 useMemo 解决刚才的问题

1. 导入 useMemo：

   ```js
   import React, { useEffect, useState, useMemo } from 'react'
   ```

2. 在 Father 组件中，使用 `useMemo` 对 `tips` 进行改造：

   ```jsx
   // 根据布尔值进行计算，动态返回内容
   const tips = useMemo(() => {
    console.log('触发了 tips 的重新计算')
    return flag ? 哪里贵了，不要睁着眼瞎说好不好 : 这些年有没有努力工作，工资涨没涨
   }, [flag])
   ```

3. 此时，点击 Father 中的 +1 按钮，并不会触发 `tips` 的重新计算，而是会使用上一次缓存的值进行渲染。只有依赖项 `flag` 变化时，才会触发 `tips` 的重新计算。

## 3. useCallback

### 语法格式

之前我们所学的 `useMemo` 能够达到缓存某个变量值的效果，而当前要学习的 `useCallback` 用来对组件内的函数进行缓存，它返回的是缓存的函数。它的语法格式如下：

```js
const memoCallback = useCallback(cb, array)
```

useCallback 会返回一个 memorized 回调函数供组件使用，从而防止组件每次 rerender 时反复创建相同的函数，能够节省内存开销，提高性能。其中：

1. cb 是一个函数，用于处理业务逻辑，这个 cb 就是需要被缓存的函数
2. array 是依赖项列表，当 array 中的依赖项变化时才会重新执行 useCallback。
   - 如果省略 array，则每次更新都会重新计算
   - 如果 array 为空数组，则只会在组件第一次初始化的时候计算一次
   - 如果 array 不为空数组，则只有当依赖项的值变化时，才会重新计算

### 基本示例

接下来，我们通过下面的例子演示使用 useCallback 的必要性：当输入框触发 onChange 事件时，会给 kw 重新赋值。kw 值的改变会导致组件的 rerender，而组件的 rerender 会导致反复创建 **onKwChange** 函数并添加到 Set 集合中，造成了不必要的内存浪费。代码如下：

```tsx
import React, { useState, useCallback } from 'react'

// 用来存储函数的 set 集合
const set = new Set()

export const Search: React.FC = () => {
  const [kw, setKw] = useState('')

  const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  // 把 onKwChange 函数的引用，存储到 set 集合中
  set.add(onKwChange)
  // 打印 set 集合中元素的数量
  console.log('set 中函数的数量为：' + set.size)

  return (
    <>
      <input type="text" value={kw} onChange={onKwChange} />
      <hr />
      <p>{kw}</p>
      <p></p>
    </>
  )
}
```

运行上面的代码，我们发现每次文本框的值发生变化，都会打印 `set.size` 的值，而且这个值一直在自增 +1，因为每次组件 rerender 都会创建一个新的 onKwChange 函数添加到 set 集合中。

为了防止 `Search` 组件 rerender 时每次都会重新创建 `onKwChange` 函数，我们可以使用 useCallback 对这个函数进行缓存。改造后的代码如下：

```tsx
import React, { useState, useCallback } from 'react'

// 用来存储函数的 set 集合
const set = new Set()

export const Search: React.FC = () => {
  const [kw, setKw] = useState('')

  const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }, [])

  // 把 onKwChange 函数的引用，存储到 set 集合中
  set.add(onKwChange)
  // 打印 set 集合中元素的数量
  console.log('set 中函数的数量为：' + set.size)

  return (
    <>
      <input type="text" value={kw} onChange={onKwChange} />
      <hr />
      <p>{kw}</p>
      <p></p>
    </>
  )
}
```

运行改造后的代码，我们发现无论 input 的值如何发生变化，每次打印的 `set.size` 的值都是 1。证明我们使用 useCallback 实现了对函数的缓存。

### useCallback 的案例

#### 1. 问题引入

1. 导入需要的 hooks 函数，并定义需要的 TS 类型：

   ```ts
   import React, { useEffect, useState, useCallback } from 'react'
   
   // 文本框组件的 props 类型
   type SearchInputType = { onChange: (e: React.ChangeEvent) => void }
   // 单词对象的 TS 类型
   type WordType = { id: number; word: string }
   ```

2. 定义 **SearchInput** 搜索框子组件，接收父组件传递进来的 **onChange** 处理函数，每当 input 触发 onChange 事件时，调用 `props.onChange` 进行处理：

   ```tsx
   // 子组件
   const SearchInput: React.FC = (props) => {
    useEffect(() => {
      console.log('触发了 SearchInput 的 rerender')
    })
   
    return 
   }
   ```

3. 定义 **SearchResult** 搜索结果子组件，接收父组件传递进来的 **query** 搜索关键字，在 useEffect 中监听 `props.query` 的变化，从而请求搜索的结果：

   ```tsx
   // 子组件：搜索结果
   const SearchResult: React.FC<{ query: string }> = (props) => {
    const [list, setList] = useState([])
   
    useEffect(() => {
      // 如果 query 为空字符串，则清空当前的列表
      if (!props.query) return setList([])
   
      // 查询数据
      fetch('https://api.liulongbin.top/v1/words?kw=' + props.query)
        .then((res) => res.json())
        .then((res) => {
          // 为列表赋值
          setList(res.data)
        })
    }, [props.query])
   
    // 渲染列表数据
    return list.map((item) => {item.word})
   }
   ```

4. 定义父组件 **SearchBox** 并渲染 **SearchInput** 组件和 **SearchResult** 组件。在父组件中监听 **SearchInput** 的 `onChange` 事件，并把父组件中定义的处理函数 `onKwChange` 传递进去。同时，把父组件中定义的搜索关键字 `kw` 传递给 **SearchResult** 组件。示例代码如下：

   ```tsx
   // 父组件
   export const SearchBox: React.FC = () => {
    const [kw, setKw] = useState('')
   
    const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setKw(e.currentTarget.value)
    }
   
    return (
      <div style={{ height: 500 }}>
        <SearchInput onChange={onKwChange} />
        <hr />
        <SearchResult query={kw} />
      </div>
    )
   }
   ```

5. 经过测试后，我们发现：

   1. 每当子组件的文本框内容发生变化，都会调用 `props.onChange` 把数据发送给父组件。
   2. 相应的，父组件通过 **onKwChange** 函数可以获取到子组件的值，并把值更新到 `kw` 中。当 kw 发生变化，会触发父组件的 rerender。
   3. 而父组件的 rerender 又会重新生成 **onKwChange** 函数并把函数的引用作为 props 传递给子组件。
   4. 这样，子组件就监听到了 `props` 的变化，最终导致子组件的 rerender。

   其实，子组件根本不需要被重新渲染，因为 `props.onChange` 函数的处理逻辑没有发生变化，只是它的引用每次都在变。为了解决这个问题，我们需要用到 **useCallback** 和 **React.memo**。

#### 2. 问题解决

1. 首先，我们需要让子组件 **SearchInput** 被缓存，所以我们需要使用 `React.memo` 对其进行改造：

   ```tsx
   // 子组件：搜索框
   const SearchInput: React.FC<SearchInputType> = React.memo((props) => {
    useEffect(() => {
      console.log('触发了 SearchInput 的 rerender')
    })
   
    return <input onChange={props.onChange} placeholder="请输入搜索关键字" />
   })
   ```

2. 使用 `React.memo` 对组件进行缓存后，如果子组件的 props 在两次更新前后没有任何变化，则被 memo 的组件不会 rerender。

   所以为了实现 SearchInput 的缓存，还需要基于 `useCallback` 把父组件传递进来的 **onChange** 进行缓存。

   在父组件中针对 **onKwChange** 调用 useCallback，示例代码如下：

   ```tsx
   const onKwChange = useCallback((e: React.ChangeEvent) => {
    setKw(e.currentTarget.value)
   }, [])
   ```

3. 经过测试，我们发现每当文本框内容发生变化，不会导致 SearchInput 组件的 rerender。

## 4. useTransition

### 1. 问题引入

`useTransition` 可以将一个更新转为**低优先级**更新，使其可以**被打断**，**不阻塞 UI** 对用户操作的响应，能够提高用户的使用体验。它常用于优化**视图切换**时的用户体验。

例如有以下3个标签页组件，分别是 `Home`、`Movie`、`About`，其中 Movie 是一个渲染特别耗时的组件，在渲染 Movie 组件期间页面的 UI 会被阻塞，用户会感觉页面十分卡顿，示例代码如下：

```tsx
import React, { useState } from 'react'

export const TabsContainer: React.FC = () => {
  // 被激活的标签页的名字
  const [activeTab, setActiveTab] = useState('home')

  // 点击按钮，切换激活的标签页
  const onClickHandler = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div style={{ height: 500 }}>
      <TabButton isActive={activeTab === 'home'} onClick={() => onClickHandler('home')}>
        首页
      </TabButton>
      <TabButton isActive={activeTab === 'movie'} onClick={() => onClickHandler('movie')}>
        电影
      </TabButton>
      <TabButton isActive={activeTab === 'about'} onClick={() => onClickHandler('about')}>
        关于
      </TabButton>
      <hr />

      {/* 根据被激活的标签名，渲染对应的 tab 组件 */}
      {activeTab === 'home' && <HomeTab />}
      {activeTab === 'movie' && <MovieTab />}
      {activeTab === 'about' && <AboutTab />}
    </div>
  )
}

// Button 组件 props 的 TS 类型
type TabButtonType = React.PropsWithChildren & { isActive: boolean; onClick: () => void }
// Button 组件
const TabButton: React.FC<TabButtonType> = (props) => {
  const onButtonClick = () => {
    props.onClick()
  }

  return (
    <button className={['btn', props.isActive && 'active'].join(' ')} onClick={onButtonClick}>
      {props.children}
    </button>
  )
}

// Home 组件
const HomeTab: React.FC = () => {
  return <>HomeTab</>
}

// Movie 组件
const MovieTab: React.FC = () => {
  const items = Array(100000)
    .fill('MovieTab')
    .map((item, i) => <p key={i}>{item}</p>)
  return items
}

// About 组件
const AboutTab: React.FC = () => {
  return <>AboutTab</>
}
```

配套的 CSS 样式为：

```css
.btn {
  margin: 5px;
  background-color: rgb(8, 92, 238);
  color: #fff;
  transition: opacity 0.5s ease;
}

.btn:hover {
  opacity: 0.6;
  transition: opacity 0.5s ease;
}

.btn.active {
  background-color: rgb(3, 150, 0);
}
```

### 2. 语法格式

```js
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  // ……
}
```

**参数**：

- 调用 `useTransition` 时不需要传递任何参数

**返回值**（数组）：

- `isPending` 布尔值：是否存在待处理的 transition，如果值为 true，说明页面上存在待渲染的部分，可以给用户展示一个加载的提示
- `startTransition` 函数：调用此函数，可以把**状态的更新**标记为**低优先级**的，不阻塞 UI 对用户操作的响应

### 3. 问题解决

修改 `TabsContainer` 组件，使用 `useTransition` 把点击按钮后为 `activeTab` 赋值的操作，标记为**低优先级**。此时 React 会优先响应用户对界面的其它操作，从而保证 UI 不被阻塞：

```tsx
import React, { useState, useTransition } from 'react'

export const TabsContainer: React.FC = () => {
  // 被激活的标签页的名字
  const [activeTab, setActiveTab] = useState('home')
  const [, startTransition] = useTransition()

  // 点击按钮，切换激活的标签页
  const onClickHandler = (tabName: string) => {
    startTransition(() => {
      setActiveTab(tabName)
    })
  }

  // 省略其它代码...
}
```

> 此时，点击 Movie 按钮后，状态的更新被标记为**低优先级**，About 按钮的 **hover 效果**和**点击操作**都会被立即响应。

### 4. 使用 isPending 展示加载状态

为了能够使用 `isPending` 的状态为按钮添加 `loading` 效果，我们需要把 `useTransition` 的调用从 `TabsContainer` 组件中挪到 `TabButton` 组件中：

```tsx
// Button 组件 props 的 TS 类型
type TabButtonType = React.PropsWithChildren & { isActive: boolean; onClick: () => void }

// Button 组件
const TabButton: React.FC<TabButtonType> = (props) => {
  const [isPending, startTransition] = useTransition()

  const onButtonClick = () => {
    startTransition(() => {
      props.onClick()
    })
  }

  return (
    <button className={['btn', props.isActive && 'active'].join(' ')} onClick={onButtonClick}>
      {props.children}
      {/* 如果处于更新状态，则在对应按钮中渲染一个 loading 图标 */}
      {isPending && ''}
    </button>
  )
}
```

### 5. 注意事项

1. 传递给 `startTransition` 的函数必须是同步的。React 会立即执行此函数，并将在其执行期间发生的所有状态更新标记为 transition。如果在其执行期间，尝试稍后执行状态更新（例如在一个定时器中执行状态更新），这些状态更新不会被标记为 transition。
2. **标记为 transition 的状态更新将被其他状态更新打断**。例如在 transition 中更新图表组件，并在图表组件仍在重新渲染时继续在输入框中输入，React 将首先处理输入框的更新，之后再重新启动对图表组件的渲染工作。
3. transition 更新不能用于控制文本输入。

## 5. useDeferredValue

### 1. 问题引入

在搜索框案例中，SearchResult 组件会根据用户输入的**关键字**，循环生成大量的 p 标签，因此它是一个渲染比较耗时的组件。代码如下：

```tsx
import React, { useState } from 'react'

// 父组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  return (
    <div style={{ height: 500 }}>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      <SearchResult query={kw} />
    </div>
  )
}

// 子组件，渲染列表项
const SearchResult: React.FC<{ query: string }> = (props) => {
  if (!props.query) return
  const items = Array(40000)
    .fill(props.query)
    .map((item, i) => <p key={i}>{item}</p>)

  return items
}
```

注意，此案例不能使用 `useTransition` 进行性能优化，因为 `useTransition` 会把状态更新标记为**低优先级**，**被标记为 transition 的状态更新将被其他状态更新打断**。因此在高频率输入时，会导致**中间的输入状态丢失**的问题。例如：

```tsx
import React, { useState, useTransition } from 'react'

// 父组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')
  // 1. 调用 useTransition 函数
  const [, startTransition] = useTransition()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 2. 将文本框状态更新标记为“低优先级”，会导致中间的输入状态丢失
    startTransition(() => {
      setKw(e.currentTarget.value)
    })
  }

  return (
    <div style={{ height: 500 }}>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      <SearchResult query={kw} />
    </div>
  )
}

// 子组件，渲染列表项
const SearchResult: React.FC<{ query: string }> = (props) => {
  if (!props.query) return
  const items = Array(40000)
    .fill(props.query)
    .map((item, i) => <p key={i}>{item}</p>)

  return items
}
```

### 2. 语法格式

`useDeferredValue` 提供一个 state 的延迟版本，根据其返回的**延迟的 state** 能够**推迟更新 UI 中的某一部分**，从而达到性能优化的目的。语法格式如下：

```js
import { useState, useDeferredValue } from 'react';

function SearchPage() {
  const [kw, setKw] = useState('');
  // 根据 kw 得到延迟的 kw
  const deferredKw = useDeferredValue(kw);
  // ...
}
```

`useDeferredValue` 的返回值为一个**延迟版的状态**：

1. 在组件首次渲染期间，返回值将与传入的值相同
2. 在组件更新期间，React 将**首先使用旧值**重新渲染 UI 结构，这能够**跳过**某些复杂组件的 rerender，从而**提高渲染效率**。随后，React 将使用新值更新 deferredValue，并在后台使用新值重新渲染是一个**低优先级的更新**。这也意味着，如果在后台使用新值更新时 value 再次改变，它将打断那次更新。

### 3. 问题解决

按需导入 `useDeferredValue` 这个 hooks API，并基于它进行搜索功能的性能优化：

```tsx
// 1. 按需导入 useDeferredValue 这个 Hooks API
import React, { useState, useDeferredValue } from 'react'

// 父组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')
  // 2. 基于 kw 的值，为其创建出一个延迟版的 kw 值，命名为 deferredKw
  const deferredKw = useDeferredValue(kw)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  return (
    <div style={{ height: 500 }}>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      {/* 3. 将延迟版的 kw 值，传递给子组件使用 */}
      <SearchResult query={deferredKw} />
    </div>
  )
}

// 子组件，渲染列表项
// 4. 子组件必须使用 React.memo() 进行包裹，这样当 props 没有变化时，会跳过子组件的 rerender
const SearchResult: React.FC<{ query: string }> = React.memo((props) => {
  if (!props.query) return
  const items = Array(40000)
    .fill(props.query)
    .map((item, i) => <p key={i}>{item}</p>)

  return items
})
```

### 4. 表明内容已过时

当 `kw` 的值频繁更新时，`deferredKw` 的值会明显滞后，此时用户在页面上看到的列表数据并不是最新的，为了防止用户感到困惑，我们可以给内容添加 opacity 透明度，**表明当前看到的内容已过时**。示例代码如下：

```tsx
// 1. 按需导入 useDeferredValue 这个 Hooks API
import React, { useState, useDeferredValue } from 'react'

// 父组件
export const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')
  // 2. 基于 kw 的值，为其创建出一个延迟版的 kw 值
  const deferredValue = useDeferredValue(kw)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  return (
    <div style={{ height: 500 }}>
      <input type="text" value={kw} onChange={onInputChange} />
      <hr />
      {/* 3. 将延迟版的 kw 值，传递给子组件使用 */}
      <div style={{ opacity: kw !== deferredValue ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
        <SearchResult query={deferredValue} />
      </div>
    </div>
  )
}
```