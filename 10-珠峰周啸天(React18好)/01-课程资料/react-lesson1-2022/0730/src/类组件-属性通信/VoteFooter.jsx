import React from 'react';
import PropTypes from 'prop-types';

class VoteFooter extends React.PureComponent {
    /* 属性规则校验 */
    static propTypes = {
        change: PropTypes.func.isRequired
    };

    render() {
        let { change } = this.props;
        return <div className="footer">
            <button onClick={change.bind(null, 'sup')}>支持</button>
            <button onClick={change.bind(null, 'opp')}>反对</button>
        </div>;
    }
};
export default VoteFooter;