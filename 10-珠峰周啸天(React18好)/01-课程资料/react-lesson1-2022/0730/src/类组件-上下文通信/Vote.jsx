import React from 'react';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';
import ThemeContext from '@/ThemeContext';

class Vote extends React.Component {
    state = {
        supNum: 10,
        oppNum: 5
    };
    change = type => {
        let { supNum, oppNum } = this.state;
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 });
            return;
        }
        this.setState({ oppNum: oppNum + 1 });
    };

    render() {
        let { supNum, oppNum } = this.state;
        return <ThemeContext.Provider
            value={{
                supNum,
                oppNum,
                change: this.change
            }}>
            <div className="vote-box">
                <header className="header">
                    <h2 className="title">React真的很不错!!</h2>
                    <span className="num">{supNum + oppNum}人</span>
                </header>
                <VoteMain />
                <VoteFooter />
            </div>
        </ThemeContext.Provider>;
    }
};
export default Vote;