import React, { useState } from 'react';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';
import ThemeContext from '@/ThemeContext';

console.log(ThemeContext);

const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);
    let [x, setX] = useState(0);
    const change = type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    };

    return <ThemeContext.Provider
        value={{
            supNum,
            oppNum,
            change
        }}>
        <div className="vote-box">
            <header className="header">
                <h2 className="title">React真的很不错!!</h2>
                <span className="num">{supNum + oppNum}人</span>
            </header>
            <VoteMain />
            <VoteFooter />

            {x} <button onClick={() => setX(x + 1)}>哈哈哈</button>
        </div>
    </ThemeContext.Provider>;
};
export default Vote;