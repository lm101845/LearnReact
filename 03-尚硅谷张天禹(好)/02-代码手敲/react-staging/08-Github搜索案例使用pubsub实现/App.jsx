import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
// 因为他叫index，所以后面的我们可以不写了

export default class App extends Component {
    // 这才是App本该有的样子，它就是个外壳
    render() {
        // const {users,isFirst,isLoading,err} = this.state
        return (
              <div className="container">
                <Search />
                <List/>
            </div>
        )
    }
}
