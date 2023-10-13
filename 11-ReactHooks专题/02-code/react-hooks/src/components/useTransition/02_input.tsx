/**
 * @Author liming
 * @Date 2023/10/13 17:02
 **/

import {FC, useState, ChangeEvent, useTransition, useDeferredValue} from 'react'

export const SearchBox: FC = () => {
    const [kw, setKw] = useState('')
    const [, startTransition] = useTransition()
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setKw(e.currentTarget.value)
        })
    }

    return (
        <div style={{ height: 500 }}>
            {/* 文本框 */}
            <input type="text" value={kw} onChange={onInputChange} />
            <hr />
            {/* 搜索的结果列表 */}
            <SearchResult query={kw} />
        </div>
    )
}

// 搜索结果组件
const SearchResult: FC<{ query: string }> =(props) => {
    if (!props.query) return

    const items = Array(40000)
        .fill(props.query)
        .map((item, i) => <p key={i}>{item}</p>)

    return items
}

