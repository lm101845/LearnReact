/**
 * @Author liming
 * @Date 2022/11/4 23:19
 **/

import React, {Component} from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies:['星际穿越','盗梦空间']
        }
    }

    render() {
        return (
            <div>
                <h2>电影列表</h2>
                <ul>
                    {
                        this.state.movies.map((item,index)=>{
                            return <li key={index}>{item}</li>
                            //key必须是唯一的，key不要用随机数，因为刷新一下变一下，新旧DOM就没有办法复用以前的了
                            //使用index作为key,对性能没有优化，不太好
                        })
                    }
                </ul>
                <button onClick={e=>{this.insertMovie()}}>添加电影</button>
            </div>
        );
    }

    insertMovie(){
        //在数组尾部添加，写不写key其实无所谓
        // this.setState({
        //     // movies:this.state.movies.push('双峰')
        //     //不要这样写，要保持state里面数据的不可变性
        //     movies:[...this.state.movies,"大话西游"]
        // })

        //在数组头部添加，不写key的话，就会没有效率
        this.setState({
            // movies:this.state.movies.push('双峰')
            //不要这样写，要保持state里面数据的不可变性
            movies:["大话西游",...this.state.movies]
        })
    }
}