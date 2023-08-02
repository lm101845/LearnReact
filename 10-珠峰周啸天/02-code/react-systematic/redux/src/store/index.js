/**
 * @Author liming
 * @Date 2023/8/2 20:24
 **/
import {createStore} from 'redux'

/*管理员reducer：负责修改store容器中的公共状态*/
let initial = {
    supNum: 10,
    oppNum: 5
}
const reducer = (state = initial, action) => {
    console.log(action, 'action')
    //state：存储store容器中的公共状态[最开始没有的时候，赋值初始状态值]
    //action:每一次基于dispatch派发的时候，传递进来的行为对象[要求必须具备type属性，存储派发的行为标识]
    //为了接下来的操作中，我们操作state，不会直接修改容器中的状态[要等到最后return的时候]我们需要先浅克隆
    state = {...state}

    //接下来我们需要基于派发的行为标识,修改store容器中的公共状态
    switch (action.type) {
        case'VOTE_SUP':
            state.supNum ++
            break;
        case 'VOTE_OPP':
            state.oppNum ++
            break;
        default:
    }
    return state
    //return的内容，会整体替换store容器中的内容
}

//创建store公共容器
const store = createStore(reducer)

//每次dispatch派发[手动触发]，都会把reducer函数[自动执行],dispatch参数是一个对象，会传给action
//其中type属性必传！！
// store.dispatch({
//     type: 'VOTE_SUP',
//     step: 10
// })
export default store
