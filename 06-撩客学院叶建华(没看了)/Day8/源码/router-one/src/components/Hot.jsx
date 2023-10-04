import React, {Component} from 'react';
import { Link } from "react-router-dom";

export default class Hot extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [
                {lid: "001", title: "布偶猫真的有尴尬期嘛?"},
                {lid: "002", title: "怎么养成一张干净的脸？"},
                {lid: "003", title: "有哪些不起眼却非常赚钱的行业？"},
                {lid: "004", title: "谁说吃货与美丽天生难以兼得？"},
            ]
        }
    }

    render() {
        return (
            <div style={{backgroundColor: 'red'}}>
                <ul>
                    {this.state.list.map((value, index)=>{
                        return (
                            <li key={index}>
                                <Link to={`/hdetail?lid=${value.lid}`}>{value.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    componentDidMount() {
        // 对应动态路由加载的组件里获取传值
        console.log(this.props.match.params.hid);
    }
}