/**
 * @Author liming
 * @Date 2022/11/13 17:07
 **/

import React, {PureComponent} from 'react';
// import CSSTransitionDemo from './transition/CSSTransitionDemo'
import SwitchTransitionDemo from "./transition/SwitchTransitionDemo";
import TransitionGroupDemo from "./transition/TransitionGroupDemo";
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
                {/*<CSSTransitionDemo/>*/}
                {/*<SwitchTransitionDemo/>*/}
                <TransitionGroupDemo/>
            </div>
        );
    }
}
