/*
 * @Author: liming
 * @Date: 2021-09-04 20:45:45
 * @LastEditTime: 2021-09-05 00:22:08
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\containers\Person\index.jsx
 */
import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { addPerson} from '../../redux/actions/person'
// 要和redux打交道，首先得引入connect
// 然后person就不能是默认export default了
// export default class Person extends Component {
class Person extends Component {
    addPerson = () => {
        // 这个addPerson是它本身的方法
        const  name = this.nameNode.value
        const age = this.ageNode.value*1
        const personObj = { id: nanoid(), name, age }
        this.props.addPerson(personObj)
        // 这个addPerson是它容器组件传过来的方法
        this.nameNode.value=''
        this.ageNode.value=''
    }
    render() {
        return (
            <div>
                <h2>我是Person组件,上方组件求和为：{ this.props.count}</h2>
                <input ref={c=>this.nameNode=c}type="text" placeholder="输入名字"/>
                <input ref={c => this.ageNode = c} type="text" placeholder="输入年龄"/>
                <button onClick={this.addPerson}>添加</button>
                <ul>
                    {
                        this.props.persons.map(p => {
                            return <li key={p.id}>{p.name} - { p.age}</li>
                        })
                    }
                    {/* <li>名字1---年龄1</li>
                    <li>名字2---年龄2</li>
                    <li>名字3---年龄3</li> */}
                </ul>
            </div>
        )
    }
}

export default connect(
    state => ({
        persons: state.persons,
        count: state.count
    }), //映射状态
    // UI组件想要状态，你就找自己容器去，容器里面已经握住了所有redux里面的状态
    {addPerson}
)(Person)
