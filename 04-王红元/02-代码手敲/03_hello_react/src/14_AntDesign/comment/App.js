/**
 * @Author liming
 * @Date 2022/11/10 19:55
 **/
import React, {PureComponent} from 'react';
import 'antd/dist/antd.less'
import CommentInput from './components/CommentInput'
import CommentItem from './components/CommentItem'


export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            commentList:[]
        }
    }

    render() {
        return (
            <div style={{width:"500px",padding:"20px"}}>
                {
                    this.state.commentList.map((item,index)=>{
                        return <CommentItem key={item.id} comment={item}/>
                    })
                }
                <CommentInput submitComment={this.submitComment1.bind(this)}/>
                {/*给子组件传递一个函数，叫submitComment*/}

            </div>
        );
    }
    submitComment1(info){
        console.log(info)
        this.setState({
          commentList:[...this.state.commentList,info]
        })
    }
}
