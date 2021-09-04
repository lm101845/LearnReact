import React, { Component } from 'react'
import Count from './containers/Count'   //这里引入的是Count的【容器】组件，而不是UI组件
import Person from './containers/Person'  //这里引入的是Person的【容器】组件，而不是UI组件

export default class App extends Component {
    render() {
        return (
            <div>
                <Count />
                <hr />
                <Person/>
            </div>
        )
    }
}
