import React from 'react';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';

class Vote extends React.Component {
    render() {
        return <div className="vote-box">
            <header className="header">
                <h2 className="title">React真的很不错!!</h2>
                <span className="num">0人</span>
            </header>
            <VoteMain />
            <VoteFooter />
        </div>;
    }
};
export default Vote;