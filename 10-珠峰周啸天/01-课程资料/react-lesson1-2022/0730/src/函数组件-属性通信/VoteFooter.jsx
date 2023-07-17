import React, { memo } from 'react';
import PropTypes from 'prop-types';

const VoteFooter = function VoteFooter(props) {
    let { change } = props;
    return <div className="footer">
        <button onClick={change.bind(null, 'sup')}>支持</button>
        <button onClick={change.bind(null, 'sup')}>反对</button>
    </div>;
};
// 属性规则校验
VoteFooter.propTypes = {
    change: PropTypes.func.isRequired
};
export default memo(VoteFooter);