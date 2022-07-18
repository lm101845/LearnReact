/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import './Logs.css';

const Logs = () => {

  return <div className="logs">

    {/*在父组件中可以直接在子组件中设置属性*/}
    {/*<LogItem test="456" hello="abc" fn={()=>{}} />*/}
    <LogItem date={new Date()} desc={"学习前端"} time={"50"} />
    <LogItem date={new Date()} desc={"哈哈"} time={"30"} />
  </div>
};

export default Logs;
