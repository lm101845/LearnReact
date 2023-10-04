/*
 * @Author: liming
 * @Date: 2021-09-05 22:24:10
 * @LastEditTime: 2021-09-06 23:11:30
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\react_extension\src\App.jsx
 */
import React, { Component, Fragment} from 'react'
// import Demo from './components/01_setState'
// import Demo from './components/02_lazyload'
// import Demo from './components/03_hooks'
// import Demo from './components/04_Fragment'
// import Demo from './components/05_Context'
// import Demo from './components/06_optimize'
// import Demo from './components/07_renderProps'
// import Demo from './components/08_ErrorBoundary'
// 这样写就写错了，你没有引到位
import Demo from './components/08_ErrorBoundary/Parent'
export default class App extends Component {
    render() {
        return (
            // <div a='1'>
            //     <Demo />
            // </div>

            <Fragment>
                <Demo />
            </Fragment>
        )
    }
}
