import CountUI from '../../components/Count'
// 引入connect用于连接UI组件与redux
import { connect } from 'react-redux'


import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'

//映射状态
// 注意：箭头函数默认返回一个【对象】，要包小括号
// const  mapStateToProps = state => ( { count: state })
   
//映射操作状态的方法
// const mapDispatchToProps = dispatch => (
//     {
//         jia: number =>dispatch(createIncrementAction(number)),
//         jian: number => dispatch(createDecrementAction(number)),
//         jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
//     }
// )

//使用connect()()创建并暴露一个Count的容器组件
export default connect(
    //mapStateToProps
    state => ({ count: state }),
    
    // mapDispatchToProps的一般写法(写成函数形式)
    //  dispatch => (
    // {
    //     jia: number =>dispatch(createIncrementAction(number)),
    //     jian: number => dispatch(createDecrementAction(number)),
    //     jiaAsync: (number, time) => dispatch(createIncrementAsyncAction(number, time))
    // }
    // )
    //  注意：2个参数都是函数，但是第二个参数可以不写函数，可以写成对象形式的！！

    //mapDispatchToProps的简写(写成对象形式)
    {
        jia: createIncrementAction,
        // 注意：createIncrementAction这个函数只能创建action对象，是不包含dispatch功能的！！！
        // 是这样的：你只要写了action，就不需要你自己写dispatch了，react-redux(API层面)会帮你自动分发的！！！它帮你dispatch
        // 这就是API层面的优化
        // 别觉得这里没写number就收不到了，这里jia是传过去了,jia的值是一个函数，函数里面可以传参数
        jian: createDecrementAction,
        jiaAsync:createIncrementAsyncAction,
    }
)(CountUI)


