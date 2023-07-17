import React from 'react'

class Demo extends React.Component{
    handler = ()=>{

    }
    render() {
        return <div>
            <button onClick={this.handler}>提交</button>
        </div>
    }

}

export default Demo

