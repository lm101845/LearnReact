import React from 'react';
import ThemeContext from '@/ThemeContext';

class VoteMain extends React.PureComponent {
    // 获取祖先注册的上下文信息
    static contextType = ThemeContext;

    render() {
        console.log('main render');
        let { supNum, oppNum } = this.context;
        let ratio = '--',
            total = supNum + oppNum;
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%';

        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
            <p>支持比率：{ratio}</p>
        </div>;
    }
};
export default VoteMain;