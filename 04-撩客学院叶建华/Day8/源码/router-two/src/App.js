import React, {Component} from 'react';
import './assets/index.css'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import routes from './routes/index';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <header className="title">
                        <Link to="/">撩课首页</Link>
                        <Link to="/stu">学生中心</Link>
                        <Link to="/user">个人中心</Link>
                    </header>
                    {
                        routes.map((route, key)=>{
                            if(route.exact){
                                return  (
                                    <Route
                                    key={key}
                                    exact
                                    path={route.path}
                                    render={props=>(
                                        <route.component {...props}  routes={route.routes}/>
                                    )}
                                />)
                            }else {
                                return  (
                                    <Route
                                        key={key}
                                        path={route.path}
                                        render={props=>(
                                            <route.component {...props}  routes={route.routes}/>
                                        )}
                                    />)
                            }
                        })
                    }
                </div>
            </Router>
        );
    }
}

export default App;
