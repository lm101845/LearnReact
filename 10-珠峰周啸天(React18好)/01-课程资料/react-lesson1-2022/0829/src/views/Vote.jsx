import React, { useContext, useState, useEffect } from 'react';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';
import ThemeContext from '@/ThemeContext';

const Vote = function Vote() {
    const { store } = useContext(ThemeContext);
    let { supNum, oppNum } = store.getState();

    // 把让组件更新的办法加入到事件池中
    let [_, setRandom] = useState(0);
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setRandom(+new Date());
        });
        // unsubscribe() 可以把刚才注入到事件池中的方法移除
    }, []);

    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React真的很不错!!</h2>
            <span className="num">{supNum + oppNum}人</span>
        </header>
        <VoteMain />
        <VoteFooter />
    </div>;
};
export default Vote;