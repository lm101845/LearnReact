/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';

const Logs = () => {

  return <div className="logs">

    {/*在父组件中可以直接在子组件中设置属性*/}
    {/*<LogItem test="456" hello="abc" fn={()=>{}} />*/}
    <LogItem date={new Date(2021,7,20,19,0)} desc={"学习前端"} time={"50"} />
    <LogItem date={new Date(2022,5,22,5,30)} desc={"哈哈"} time={"30"} />
  </div>
};

export default Logs;
