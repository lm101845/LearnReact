/**
 * @Author liming
 * @Date 2022/11/10 19:57
 **/

import React, {PureComponent} from 'react';
import {Button, Input} from 'antd';
import moment from 'moment'
const { TextArea } = Input;
export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            content:""
        }
    }

    render() {
        return (
            <div>
                <TextArea rows={4} value={this.state.content} onChange={e=>this.handleChange(e)}/>
                <Button type="primary" onClick={()=>this.addComment()}>添加评论</Button>
            </div>
        );
    }

    addComment(){
        console.log(this.state.content)
        const commentInfo = {
            id:moment().valueOf(),
            avatar:"https://upload.jianshu.io/users/upload_avatars/8974425/7a564929-be0a-4fdb-990f-67d286eae6ec.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
            nickname:"孤城落日",
            datetime:moment(),
            content:this.state.content
        }
        this.props.submitComment(commentInfo)
        this.setState({
            content:""
        })
    }

    handleChange(event){
        this.setState({
            content:event.target.value
        })
    }
}
