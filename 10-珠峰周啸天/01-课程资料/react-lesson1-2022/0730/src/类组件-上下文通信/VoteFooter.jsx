import React from 'react';
import ThemeContext from '@/ThemeContext';

class VoteFooter extends React.PureComponent {
    render() {
        console.log('footer render');
        return <ThemeContext.Consumer>
            {context => {
                let { change } = context;
                return <div className="footer">
                    <button onClick={change.bind(null, 'sup')}>支持</button>
                    <button onClick={change.bind(null, 'opp')}>反对</button>
                </div>;
            }}
        </ThemeContext.Consumer>;
    }
};
export default VoteFooter;