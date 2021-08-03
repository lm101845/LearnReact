import React, {Component} from 'react';
import {Route, Link} from "react-router-dom";

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render() {
        console.log(this.props.routes);
        return (
            <div className="user">
                <div className="content">
                    <div className="left">
                        <Link to="/user/">主面板</Link>
                        <br/>
                        <br/>
                        <Link to="/user/info">用户信息</Link>
                    </div>
                    <div className="right">
                        {
                            this.props.routes.map((route, key)=>{
                                return  <Route key={key} exact path={route.path} component={route.component} />
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}