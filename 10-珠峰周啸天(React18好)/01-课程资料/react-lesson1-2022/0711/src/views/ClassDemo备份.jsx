import React from "react";
import PropTypes from 'prop-types';

class ClassDemo extends React.Component {
    /* 属性规则处理 */
    static defaultProps = {
        x: 0,
        y: 0
    };
    static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number
    };

    // 状态 this.state={num:10}
    state = {
        num: 10
    };

    constructor(props) {
        super(); //一但使用了ES6继承，编写constructor函数，则进来需先执行super
    }

    render() {
        let { num } = this.state;

        return <div className="box">
            {num}
            <br />
            <button onClick={() => {
                /* this.state.num = 200;
                this.forceUpdate();  //控制视图强制更新 */

                this.setState({
                    num: 200
                }); //setState修改状态的同时，也可以控制视图的更新
            }}>新增</button>
        </div>;
    }
};

export default ClassDemo;