/**
 * @Author liming
 * @Date 2022/11/8 0:19
 **/

import React, {PureComponent} from 'react';

function withAuth(WrappedComponent){
    const NewCpn =  props=>{
        const {isLogin} = props
        if(isLogin){
            return <WrappedComponent {...props}/>
        }else{
            return <LoginPage/>
        }

    }
    NewCpn.displayName = "AuthCpn"
    return NewCpn;
}

//购物车组件
class CartPage extends PureComponent{
    render() {
        return <h2>CartPage</h2>
    }
}

const AuthCartPage = withAuth(CartPage)
class LoginPage extends PureComponent{
    render() {
        return <h2>登录页面</h2>
    }
}
export default class App extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    render() {
        return (
            <div>
                <AuthCartPage isLogin={true}/>
                {/*如果很多组件都要做鉴权，这样做会很麻烦*/}
            </div>
        );
    }
}
