import React from 'react'
import ThemeContext from '../ThemeContext'

class VoteMain extends React.Component{
    static contextType = ThemeContext    //contextType名字不能改！！
    render() {
        const {store} = this.context
        console.log(store,'类组件VoteMain上下文中的store')
        let {supNum,oppNum} = store.getState()
        return <div className="main">
            <p>支持人数：{supNum}人</p>
            <p>反对人数：{oppNum}人</p>
        </div>;
    }

    componentDidMount() {
        const {store} = this.context
        store.subscribe(()=>{
            this.forceUpdate()
        })
    }
}

// const VoteMain = props => {
//     return <div className="main">
//         <p>支持人数：0人</p>
//         <p>反对人数：0人</p>
//     </div>;
// }

export default VoteMain
