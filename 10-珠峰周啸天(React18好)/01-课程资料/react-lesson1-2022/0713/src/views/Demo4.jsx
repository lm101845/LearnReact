import React from "react";
export default class Demo extends React.Component {
    state = {
        num: 0
    };
    componentDidMount() {
        for (let i = 0; i < 10; i++) {
            /* this.setState({
                num: this.state.num + 1
            }); //=> 最后合并更新，结果还是1*/

            this.setState((prevState) => {
                console.log(prevState);
                return {
                    num: prevState.num + 1
                }
            });
        }
    }
    render() {
        console.log('render');
        let { num } = this.state;
        return <div className="demo">
            {num}
        </div>;
    }
};