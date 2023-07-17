import React, { memo, useContext } from 'react';
import ThemeContext from '@/ThemeContext';

const VoteFooter = function VoteFooter(props) {
    console.log('footer render');
    let { change } = useContext(ThemeContext);
    return <div className="footer">
        <button onClick={change.bind(null, 'sup')}>支持</button>
        <button onClick={change.bind(null, 'sup')}>反对</button>
    </div>;
};
export default memo(VoteFooter);