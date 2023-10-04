import React, { useState, useCallback } from 'react';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';

const Vote = function Vote() {
    let [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(5);

    const change = useCallback(type => {
        if (type === 'sup') {
            setSupNum(supNum + 1);
            return;
        }
        setOppNum(oppNum + 1);
    }, [supNum, oppNum]);

    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React真的很不错!!</h2>
            <span className="num">{supNum + oppNum}人</span>
        </header>
        <VoteMain supNum={supNum} oppNum={oppNum} />
        <VoteFooter change={change} />
    </div>;
};
export default Vote;