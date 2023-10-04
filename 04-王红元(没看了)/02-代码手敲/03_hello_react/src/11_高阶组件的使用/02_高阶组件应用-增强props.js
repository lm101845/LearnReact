/**
 * @Author liming
 * @Date 2022/11/7 23:39
 **/

import React, {PureComponent} from 'react';

//定义一个高阶组件
function enchanceRegionProps(WrappedComponent){
    return props=>{
        return <WrappedComponent {...props} region="中国"/>
    }
}
class Home extends PureComponent{
    render() {
        return <h2>Home:{`昵称:${this.props.nickname} 等级：${this.props.level}区域：${this.props.region}`}</h2>
    }
}



class About extends PureComponent{
    render() {
        return <h2>About:{`昵称:${this.props.nickname} 等级：${this.props.level}区域：${this.props.region}`}</h2>
    }
}

const EnchanceHome = enchanceRegionProps(Home)
const EnchanceAbout = enchanceRegionProps(About)
class App extends PureComponent {
    render() {
        return (
            <div>
                App
                <EnchanceHome nickname="coderwhy" level={90} />
                <EnchanceAbout nickname="kobe" level={99}/>
            </div>
        );
    }
}


function enhanceComponent(WrappedComponent){
    class  NewComponent extends PureComponent{
        //类的写法，名字不写也是可以的
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    NewComponent.displayName = "Kobe"
    return NewComponent
}

const EnHanceComponent = enhanceComponent(App)

export default  EnHanceComponent
