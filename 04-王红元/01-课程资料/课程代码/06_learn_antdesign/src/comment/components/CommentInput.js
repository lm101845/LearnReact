import React, { PureComponent } from 'react';

import moment from 'moment';

import { Input, Button } from "antd";

export default class CommentInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    }
  }

  render() {
    return (
      <div>
        <Input.TextArea rows={4} 
                        value={this.state.content}
                        onChange={e => this.handleChange(e)}/>
        <Button type="primary" onClick={e => this.addComment()}>添加评论</Button>
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      content: event.target.value
    })
  }

  addComment() {
    const commentInfo = {
      id: moment().valueOf(),
      avatar: "https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/240/h/240",
      nickname: "coderwhy",
      datetime: moment(),
      content: this.state.content,
      comments: [
        
      ]
    }

    this.props.submitComment(commentInfo);

    this.setState({
      content: ""
    })
  }
}
