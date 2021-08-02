/*
 * @Author: liming
 * @Date: 2021-08-02 23:26:58
 * @LastEditTime: 2021-08-03 00:32:09
 * @FilePath: \react-staging\src\App.js
 */
import logo from './logo.svg';
// 一切皆模块，图片也可以作为一个模块来进行引入
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         好嗨呦
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
