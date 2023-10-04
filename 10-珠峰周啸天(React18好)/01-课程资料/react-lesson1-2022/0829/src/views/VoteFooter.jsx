import React, { useContext } from 'react';
import ThemeContext from '@/ThemeContext';

const VoteFooter = function VoteFooter() {
    const { store } = useContext(ThemeContext);

    return <div className="footer">
        <button onClick={() => {
            store.dispatch({
                type: 'VOTE_SUP',
                payload: 10
            });
        }}>支持</button>

        <button onClick={() => {
            store.dispatch({
                type: 'VOTE_OPP'
            });
        }}>反对</button>
    </div>;
};
export default VoteFooter;