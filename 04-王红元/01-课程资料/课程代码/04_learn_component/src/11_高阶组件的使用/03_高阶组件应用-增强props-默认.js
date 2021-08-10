import React, { PureComponent, createContext } from 'react';

// 创建Context
const UserContext = createContext({
  nickname: "默认",
  level: -1,
  区域: "中国"
});
class Home extends PureComponent {
  render() {
    return (
      <UserContext.Consumer>
        {
          user => {
            return <h2>Home: {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}</h2>
          } 
        }
      </UserContext.Consumer>
    )
  }
}

class About extends PureComponent {
  render() {
    return (
      <UserContext.Consumer>
        {
          user => {
            return <h2>About: {`昵称: ${user.nickname} 等级: ${user.level} 区域: ${user.region}`}</h2>
          } 
        }
      </UserContext.Consumer>
    )
  }
}

class App extends PureComponent {
  render() {
    return (
      <div>
        App
        <UserContext.Provider value={{nickname: "why", level: 90, region: "中国"}}>
          <Home/>
          <About/>
        </UserContext.Provider>
      </div>
    )
  }
}

export default App;

