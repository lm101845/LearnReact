import React, { PureComponent } from 'react';

import Home from '../home';
import Profile from '../profile';
import styled, { ThemeProvider } from 'styled-components';

const HYButton = styled.button`
  padding: 10px 20px;
  border-color: red;
  color: red;
`

// const HYPrimaryButton = styled.button`
//   padding: 10px 20px;
//   border-color: red;
//   color: #fff;
//   background-color: green;
// `

const HYPrimaryButton = styled(HYButton)`
  color: #fff;
  background-color: green;
`

export default class App extends PureComponent {
  render() {
    return (
      <ThemeProvider theme={{themeColor: "red", fontSize: "30px"}}>
        <Home />
        <hr />
        <Profile />
        <HYButton>我是普通的按钮</HYButton>
        <HYPrimaryButton>我是主要的按钮</HYPrimaryButton>
      </ThemeProvider>
    )
  }
}
