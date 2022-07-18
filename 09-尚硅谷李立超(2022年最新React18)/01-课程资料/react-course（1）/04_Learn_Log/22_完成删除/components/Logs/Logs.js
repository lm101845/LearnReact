/* 日志的容器 */
import LogItem from "./LogItem/LogItem";
import Card from "../UI/Card/Card";
import './Logs.css';

const Logs = (props) => {

    /*
    *   logsDate 用来存储学习的日志，
    *       这个数据除了当前组件Logs需要使用外，LogsForm也需要使用
    *       当遇到一个数据需要被多个组件使用时，我们可以将数据放入到这些组件共同的祖先元素中
    *       这样就可以使得多个组件都能方便的访问到这个数据
    *
    *   state的提升
    *
    * */
    // 模拟一组从服务器中加载的数据


    // 将数据放入JSX中
    const logItemDate = props.logsData.map((item, index) => <LogItem
                                                                     onDelLog={()=>props.onDelLog(index)}
                                                                     key={item.id}
                                                                     date={item.date}
                                                                     desc={item.desc}
                                                                     time={item.time}/>);

    return <Card className="logs">
        {
            logItemDate
            // logsData.map(item => <LogItem {...item}/> )
        }
    </Card>
};

export default Logs;
