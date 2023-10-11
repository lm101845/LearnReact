/**
 * @Author liming
 * @Date 2023/10/11 15:44
 **/

import { FC, PropsWithChildren, useState, useTransition } from 'react'

// 父组件
export const TabsContainer: FC = () => {
    const [activeTab, setActiveTab] = useState('home')
    const [isPending, startTransition] = useTransition()

    // 按钮的点击事件处理函数
    const onBtnClick = (name: string) => {
        // 把某次更新，标记为低优先级的，从而防止页面卡顿的情况
        //startTransition里面的代码必须是同步的！！！
        startTransition(() => {
            setActiveTab(name)
        })
    }

    // 渲染标签页的函数
    const renderTabs = () => {
        if (isPending) return <h3>Loading...</h3>

        switch (activeTab) {
            case 'home':
                return <HomeTab />
            case 'movie':
                return <MovieTab />
            case 'about':
                return <AboutTab />
        }
    }

    return (
        <div style={{ height: 500 }}>
            {/* 按钮区域 */}
            <TabButton isActive={activeTab === 'home'} onClick={() => onBtnClick('home')}>
                Home
            </TabButton>
            <TabButton isActive={activeTab === 'movie'} onClick={() => onBtnClick('movie')}>
                Movie
            </TabButton>
            <TabButton isActive={activeTab === 'about'} onClick={() => onBtnClick('about')}>
                About
            </TabButton>
            <hr />
            {/* 标签页区域 */}
            {renderTabs()}
        </div>
    )
}

//按钮区
const TabButton: FC<PropsWithChildren & { onClick: () => void; isActive: boolean }> = (props) => {
    return (
        <button className={['btn', props.isActive ? 'active' : ''].join(' ')} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

//tab区
const HomeTab: FC = () => {
    return <>HomeTab</>
}

// 模拟一个渲染耗时的组件
const MovieTab: FC = () => {
    const items = Array(100000)
        .fill('MovieTab')
        .map((item, i) => <p key={i}>{item}</p>)

    return items
}

const AboutTab: FC = () => {
    return <>AboutTab</>
}
