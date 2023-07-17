import React from "react";
import PropTypes from 'prop-types';

/*
new ClassDemo([props])
  @1 getDefaultProps && 属性规则校验
  @2 初始化
     + 把constructor执行，把处理好的props传递给constructor
       + super() 等价于 React.Component.call(this)
         this.props=undefined
         this.refs={}
         this.context=undefined
         this.updater={...}
       + super(props) 此处直接把传递进来的props挂载到实例上
         this.props={...}
         ...
     + 初始化状态 this.state={...}
  @3 初始化结束后，会把props/context这些信息全部挂载到实例上
     this.props={...}
     this.context={...}
     ...
  @4 触发一个周期函数componentWillMount：第一次渲染之前
    + 不安全的周期函数
    + UNSAFE_componentWillMount「在React.StrictMode严格模式下会报错」
    + 建议大家放弃这个周期函数
  @5 触发render周期函数
    + 把render执行返回的JSX元素对象(虚拟DOM对象)进行渲染解析
    + render必须要有，必须返回JSX
  @6 触发componentDidMount周期函数：第一次渲染完
    + 获取真实的DOM元素
    + 从服务器获取数据
    + 设置定时器或者监听器
    + ...

基于setState修改状态，通知视图更新
  @1 触发shouldComponentUpdate：是否允许更新
    + 返回true：允许更新，继续执行后续的步骤
    + 返回false：则停止更新，状态/属性值也不会修改、视图也不会更新
    + 可以基于这个周期函数做项目性能优化
    + 进行到这一步，状态和属性还没有改为最新的值
  @2 触发componentWillUpdate：不安全的
    + 进行到这一步，状态和属性还没有改为最新的值
  @3 修改状态/属性为最新的值，基于this.props/state访问，获取的也是最新的值
  @4 触发render：让视图按照最新的值进行渲染更新
  @5 触发componentDidUpdate：视图更新完毕
  @6 如果setState设置了回调函数，则把回调函数触发执行「类似于Vue->$nextTick」
    特殊：即便shouldComponentUpdate返回的是false，此回调函数也会被触发执行

基于forceUpdate强制让视图更新
  @1 直接跳过shouldComponentUpdate，继续下一步操作
  ...

父组件重新调用这个组件(可能传递新的属性值进来)，组件也需要更新
  @1 触发componentWillReceiveProps：不安全
  @2 触发shouldComponentUpdate
  ...

组件销毁
  @1 触发componentWillUnmount周期函数：销毁之前
    + 把自己手动设置的事件、定时器、监听器...手动释放掉，来优化性能
    + 对目前组件中的一些信息，做缓存(信息草稿箱)
    + ...
  @2 销毁
 */

class ClassDemo extends React.Component {
    /* 属性规则处理 */
    static defaultProps = {
        x: 0,
        y: 0
    };
    static propTypes = {
        x: PropTypes.number,
        y: PropTypes.number
    };

    state = {
        num: 10
    };

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(this.props, this.state); //原有的属性和状态
        // console.log(nextProps, nextState); //即将要修改的属性和状态
        return false;
    }

    


    render() {
        let { num } = this.state;
        return <div className="box">
            {num}
            <br />
            <button onClick={() => {
                this.setState({
                    num: 200
                }, () => {
                    console.log('setState回调函数');
                });
            }}>新增</button>
        </div>;
    }
};

export default ClassDemo;