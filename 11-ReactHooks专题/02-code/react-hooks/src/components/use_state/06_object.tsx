/**
 * @Author liming
 * @Date 2023/10/2 8:36
 **/

import React, {useState} from 'react'

const UserInfo: React.FC = () => {
    const [user, setUser] = useState({
        name: 'zs',
        age: 12,
        gender: '男',
        hobby:{
            a:'吃饭',
            b:'睡觉'
        }
    })

    const updateUserInfo = () => {
        user.name = 'Jesse Pinkman'
        user.hobby.a = '喝酒'
        // 下面的写法是错误的，因为 set 函数内部，会对更新前后的值进行对比；
        // 由于更新前后的 user，原值的引用和新值的引用相同，
        // 所以 react 认为值没有发生变化，不会触发组件的重新渲染。
        // setUser(user)

        // 解决方案：用新对象的引用替换旧对象的引用，即可正常触发组件的重新渲染。
        setUser({ ...user })
        // setUser(Object.assign({}, user))
    }

    return (
        <>
            <h1>用户信息：</h1>
            <p>姓名：{user.name}</p>
            <p>年龄：{user.age}</p>
            <p>性别：{user.gender}</p>
            <p>爱好：{user.hobby.a}</p>
            <p>爱好：{user.hobby.b}</p>

            <button onClick={updateUserInfo}>更新用户信息</button>
        </>
    )
}

export default UserInfo
