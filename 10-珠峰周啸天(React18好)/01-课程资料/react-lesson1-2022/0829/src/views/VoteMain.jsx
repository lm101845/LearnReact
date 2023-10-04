import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '@/ThemeContext';

const VoteMain = function VoteMain() {
    const { store } = useContext(ThemeContext);
    let { supNum, oppNum } = store.getState();

    // 把让组件更新的办法加入到事件池中
    let [_, setRandom] = useState(0);
    useEffect(() => {
        store.subscribe(() => {
            setRandom(+new Date());
        });
    }, []);

    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
    </div>;
};
export default VoteMain;