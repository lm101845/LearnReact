/*
 * @Author: liming
 * @Date: 2022-05-01 22:02:19
 * @LastEditTime: 2022-05-01 22:05:04
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\04_组件通信的案例\App.js
 */
import React, { Component } from 'react'
import TabControl from './TabControl'
export default class App extends Component {
    constructor(props) {
        super(props)
        this.titles =  ['流行', '新款', '精选']
        this.state = {
            // currentIndex:0,
            currentTitle: "流行",
            // titles: ['流行', '新款', '精选']
        }
    }
    render() {
        const { currentTitle, titles } = this.state
        return (
            <div>
                <TabControl titles={ this.titles } itemClick={ index => this.itemClick(index) } />
                <h2>{ currentTitle }</h2>
            </div>
        )
    }

    itemClick(index) {
        console.log(index, 'index');
        this.setState({
            currentTitle: this.titles[index]
        })

    }
}
