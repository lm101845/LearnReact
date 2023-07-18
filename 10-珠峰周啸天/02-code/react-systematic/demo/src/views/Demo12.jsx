import React from 'react'

class Demo extends React.Component {
    state = {
        email: "1018@qq.com"
    }

    render() {
        return <div>
            <input type="text" value={this.state.email} onChange={ev => {
                console.log(ev)
                let target = ev.target
                let text = target.value.trim()
                this.setState({
                    email:text
                })
            }
            }/>
        </div>
    }

}

export default Demo

