import React, {PureComponent} from 'react';

export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div>
                App
            </div>
        );
    }
}
