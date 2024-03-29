/**
 * @Author liming
 * @Date 2022/11/8 16:49
 **/

import React, { PureComponent, StrictMode } from 'react';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        console.log("home constrcutor调用了");
    }

    // UNSAFE_componentWillMount() {
    //   console.log("home componentWillMount");
    // }

    render() {
        return (
            <div ref="title">
                Home
            </div>
        )
    }
}

class Profile extends PureComponent {
    constructor(props) {
        super(props);

        console.log("profile constructor");
    }

    // UNSAFE_componentWillMount() {
    //   console.log("profile componentWillMount");
    // }

    render() {
        return (
            <div ref="title">
                Profile
            </div>
        )
    }
}

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <StrictMode>
                    <Home/>
                </StrictMode>
                <Profile/>
            </div>
        )
    }
}
