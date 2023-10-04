import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import Hot from './components/Hot';
import Follow from './components/Follow';
import Recommend from './components/Recommend';
import Hdetail from  './components/Hdetail';
import Login from  './components/Login';

class App extends Component {
  render() {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">推荐</Link>
                        </li>
                        <li>
                            <Link to="/hot">热榜</Link>
                        </li>
                        <li>
                            <Link to="/follow/">关注</Link>
                        </li>
                    </ul>
                </nav>


                <br/>
                <br/>
                <br/>
                <hr/>

                <Route path="/" exact component={Recommend} />
                <Route path="/hot" component={Hot} />
                <Route path="/follow/" component={Follow} />
                <Route path="/hdetail/" component={Hdetail} />
                <Route path="/login/" component={Login} />
            </div>
        </Router>
    );
  }
}

export default App;
