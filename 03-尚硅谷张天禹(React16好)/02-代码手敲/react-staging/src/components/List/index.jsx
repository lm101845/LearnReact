import React, { Component } from 'react'
import './index.css'
export default class List extends Component {
    render() {
        const { users,isFirst,isLoading,err} = this.props
        return (
            <div className="row">
                {/* 注意：JSX里面不能写if判断(语句)，只能写(三元)表达式 */}
                {
                    // this.props.users.map((userObj) => {
                    // 三元表达式可以连着写
                    isFirst ? <h2 style={{marginLeft:'100px'}}>欢迎使用，请输入关键字,随后点击搜索</h2> :
                        isLoading ? <h2 style={{marginLeft:'100px'}}>Loading...</h2> :
                            err ?  <h2 style={{color:'red'}}>{err}</h2> :
                                // 这里有个坑，不能输入错误对象err,而是要输入错误信息err.message
                    users.map((userObj) => {
                        return (
                            <div key={userObj.id} className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )

                    })
                }
            </div>
        )
    }
}

