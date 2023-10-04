/**
 * @Author liming
 * @Date 2022/11/10 17:30
 **/

import React, {PureComponent} from 'react';
import classNames from 'classnames'
export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isActive: true
        }
    }

    render() {
        const {isActive} = this.state
        const isBar = false;
        const errClas = "error"
        const warnClass = null;
        return (
            <div>
                {/*原生React中添加class的方法 */}
                <h2 className={"foo bar active title"}>我是标题1</h2>
                <h2 className={"title " + (isActive ? "active" :"")}>我是标题2</h2>
                <h2 className={["title" , (isActive ? "active" :"")].join(" ")}>我是标题3</h2>
                <hr/>
                {/*使用classNames库添加class*/}
                <h2 className="foo,bar,active,title">我是标题4-1</h2>
                <h2 className={classNames("foo","bar","active","title")}>我是标题4-2</h2>
                <h2 className={classNames({"active":isActive,"bar":isBar},"title")}>我是标题5</h2>
                <h2 className={classNames("foo",errClas,warnClass,{"active":isActive})}>我是标题6</h2>
                <hr/>
                <h2 className={classNames(["a","b",{"c":isActive }])}>我是标题7</h2>
                <h2>我是标题8</h2>
                <h2>我是标题9</h2>
            </div>
        );
    }
}
