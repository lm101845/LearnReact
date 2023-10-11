/**
 * @Author liming
 * @Date 2023/10/11 14:45
 **/

import React, {FC, useCallback, useEffect, useState} from 'react'

const set = new Set();

const Search: FC = () => {
    const [kw, setKw] = useState('');
    //这个函数每次执行都会创建一份新的onKwChange函数，影响性能
    //这个函数体里面的代码，永远都是这个代码，不会变，所以我们不需要每次都创建一份新的
    const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKw(e.currentTarget.value)
    }

    set.add(onKwChange)
    console.log(set.size, '打印一下集合的大小')

    return <>
        <input type="text" value={kw} onChange={onKwChange}/>
        <hr/>
        <p>{kw}</p>
    </>
}

//优化写法
const SearchEnforce: FC = () => {
    const [kw, setKw] = useState('');

    const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKw(e.currentTarget.value)
    }, [])

    set.add(onKwChange)
    console.log(set.size, '打印一下集合的大小111')

    return <>
        <input type="text" value={kw} onChange={onKwChange}/>
        <hr/>
        <p>{kw}</p>
    </>
}


//===================================================
type SearchInputType = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type wordType = {
    id: number,
    word: string
}
const SearchBox: React.FC = () => {
    const [kw, setKw] = useState('')

    const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setKw(e.currentTarget.value)
        console.log(e.currentTarget.value, 'onKwChange函数执行了')
    }, [])
    //这个函数只用被创建一次就行了，所以传一个空数组

    return (
        <>
            {/* 搜索框组件 */}
            <SearchInput onChange={onKwChange}/>
            <hr/>
            {/* 搜索结果组件 */}
            <SearchResult query={kw}/>
        </>
    )
}

const SearchInput: React.FC<SearchInputType> = React.memo((props) => {
    useEffect(() => {
        console.log('SearchInput组件被重新渲染了')
        //但是SearchInput组件没必要重新渲染，它里面没有state状态
        //它只依赖于父组件传过来的props对象,这个对象里面包含了onChange处理函数
        //而且这个处理函数的逻辑是固定的
        //为了防止子组件重新渲染，使用React.memo对子组件进行缓存
    })
    return <input type="text" onChange={props.onChange}/>
})

const SearchResult: React.FC<{ query: string }> = (props) => {
    const [list, setList] = useState<wordType[]>([])
    useEffect(() => {
        console.log('SearchResult组件里面的useEffect函数执行了')
        // 如果 query 为空字符串，则清空当前的列表
        if (!props.query) return setList([])
        fetch('https://api.liulongbin.top/v1/words?kw=' + props.query)
            .then((res) => res.json())
            .then((res) => {
                // 为列表赋值
                console.log(res, '打印res')
                setList(res.data)
            })
    }, [props.query])
    return list.map((item) => <p key={item.id}>{item.word}</p>)
}

// export default Search
// export default SearchEnforce
export default SearchBox
