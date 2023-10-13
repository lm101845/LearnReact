/**
 * @Author liming
 * @Date 2023/10/13 17:14
 **/

import React, {FC, useState, ChangeEvent, useTransition, useDeferredValue} from 'react'

export const SearchBox: FC = () => {
    console.log('123456')
    const [kw, setKw] = useState('')
    // 根据 kw 得到延迟的 kw
    const deferredKw = useDeferredValue(kw);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKw(e.currentTarget.value)
    }

    return (
        <div style={{ height: 500 }}>
            {/* 文本框 */}
            <input type="text" value={kw} onChange={onInputChange} />
            <hr />
            {/* 搜索的结果列表 */}
            {/*<SearchResult query={deferredKw} />*/}
            <div style={{ opacity: kw !== deferredKw ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
                <SearchResult query={deferredKw} />
            </div>
        </div>
    )
}

// 搜索结果组件
const SearchResult: FC<{ query: string }> = React.memo((props) => {
    if (!props.query) return

    const items = Array(10000)
        .fill(props.query)
        .map((item, i) => <p key={i}>{item}</p>)

    return items
})
