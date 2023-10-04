/*
 * @Author: liming
 * @Date: 2022-05-01 22:02:54
 * @LastEditTime: 2022-05-01 22:25:07
 * @FilePath: \04-王红元\02-代码手敲\03_hello_react\src\04_组件通信的案例\TabControl.js
 */
import React, { Component } from 'react'
import propTypes from 'prop-types'
export default class TabControl extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        }
    }
    render() {
        const { titles } = this.props
        const { currentIndex } = this.state
        return (
            <div className='tab-control'>
                {
                    titles.map((item, index) => {
                        return (
                            <div
                                key={ index }
                                className={ "tab-item " + (index === currentIndex ? "active" : "") }
                                onClick={ e => { this.itemClick(index) } }
                            >
                                <span>{ item }</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    itemClick(index) {
        const { itemClick } = this.props
        this.setState({
            currentIndex: index
        })
        itemClick && itemClick(index)
    }
}

TabControl.propTypes = {
    titles: propTypes.array.isRequired
}
