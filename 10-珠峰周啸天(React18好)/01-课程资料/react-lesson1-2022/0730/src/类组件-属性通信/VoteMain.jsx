import React from 'react';
import PropTypes from 'prop-types';

class VoteMain extends React.PureComponent {
    /* 属性规则校验 */
    static defaultProps = {
        supNum: 0,
        oppNum: 0
    };
    static propTypes = {
        supNum: PropTypes.number,
        oppNum: PropTypes.number
    };

    render() {
        let { supNum, oppNum } = this.props;
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