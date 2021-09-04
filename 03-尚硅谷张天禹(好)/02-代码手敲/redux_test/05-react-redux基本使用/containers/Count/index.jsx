// 注意：容器组件不能使用rcc代码片段来写！！！
// 容器组件是一个桥梁，它的左手边是UI组件，它的右手边是redux组件——这2个要引入
// 这个容器组件通过一个东西(react-redux库)去生成，不能自己亲自去写

//引入Count的UI组件
import CountUI from '../../components/Count'

// 引入store
// 问题：你现在所处的位置是在容器里面，容器里面是不用你这么来引入store的！！！！

// 没记错的话，App好像给容器里面穿进去store了！！！！
// import store from '../../redux/store'


//引入redux中的store——不是把redux文件夹里面的东西【都】引入！！！ 只要把最为核心的store引入即可
// 注意：容器里面的store不是让程序员在这里【亲自引入】的！！！！！！
// import store from '../../redux/store'

//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

// 引入redux里面的increment里面的action，这样就不用靠自己写了
import { createIncrementAction, createDecrementAction,createIncrementAsyncAction} from '../../redux/count_action'
// const Countcontainer = connect()(countUI)
// // 信息1：connect是一个函数
// // 信息2：connect调用的返回值依然是一个函数 

// export default Countcontainer
//这就是react-redux里面的规矩，你只能试着理解和使用
//a函数的返回值作为状态传递给了UI组件
// a函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给给UI组件props的value
// a函数传递的是【状态】 

// a函数的使命就是把状态传进去，且容器组件已经收到了store
//且a函数是react-redux帮你调用的
// function a(state) {
function mapStateToProps(state) {
    // 给a起个名字叫mapStateToProps更好听
    //容器给UI传东西，要通过props,key-value的形式
    // UI组件再通过this.props.key取出value      
    // return 1;
    // return { count: 999 }
    // 这999不能这么写，而是要从redux里面得到一些东西

    // return { count: store.getState() }
    // 这里根本不需要通过store.getState()获取状态，react-redux帮你调用a函数的额时候，已经帮你把状态传过去了！！
    // 你只要在这里接收一下即可
    return { count: state}
    
    //必须要写成对象的形式，你这么写就相当于把n:999传给UI了
    // 相当于<CountUI n={999}/>——这种代码你没机会自己写，所以只能通过函数的方式这么写
}

// b函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给给UI组件props的value
// b函数传递的是【操作状态的方法】

// 其实b函数里面有dispatch,它把dispatch传给你了，所以就不用store.了
// function b() {
// function b(dispatch) {
function mapDispatchToProps(dispatch) {
    // 给b也改个名字
    // return { jia: (data) => { console.log(data)}}
    return {
        // 你父亲这里的jia，收到了你的值，告诉redux开始加
        jia: number => 
            //通知redux执行加法
            // store.dispatch({
            // dispatch({
            //     // type: 'increment', data: number
            //     // 这个是action对象，这个也不用亲手写的
            // })
            dispatch(createIncrementAction(number)),
            jian: number => dispatch(createDecrementAction(number)),
            jiaAsync: (number,time) => dispatch(createIncrementAsyncAction(number,time))
     }
    // 在这里通知redux执行加法去加1，这件事情就打通了
}

//简写形式
//使用connect()()创建并暴露Count的容器组件
// export default connect(a,b)(CountUI)
export default connect(mapStateToProps,mapDispatchToProps)(CountUI)

// 有点问题：容器组件和UI组件是父子不假，但是我们实际光看代码是看不出它们的父子关系的
// 它们不是靠通过标签来写的父子关系

// 注意：connect在第一次调用的时候，你要传入2个参数,并且这2个参数必须是函数 


