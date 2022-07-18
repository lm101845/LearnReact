import Logs from "./Components/Logs/Logs";
import LogsForm from "./Components/LogsForm/LogsForm";
import './App.css';

const App = () => {
  return <div className="app">
    {/*引入LogsFrom*/}
    <LogsForm/>
    <Logs/>
  </div>;
};

// 导出App
export default App;
