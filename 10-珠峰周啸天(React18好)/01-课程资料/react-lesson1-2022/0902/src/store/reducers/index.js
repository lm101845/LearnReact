/* 把各个板块的reducer合并在一起 */
import { combineReducers } from 'redux';
import voteReducer from './voteReducer';
import personReducer from './personReducer';

/* 
 公共状态也开始按照模块进行划分
   state
     + vote
        + supNum
        + oppNum
     + person
        + info
 */
const reducer = combineReducers({
    vote: voteReducer,
    person: personReducer
});
export default reducer;


/* 
// 原理：并不会把每个板块的reducer合成一个，而是创建一个新的reducer出来；当每一次派发任务的时候，都会执行新的reducer，而我们在这里，把每个版块的reducer都执行，获取每个版块最新的状态，最后替换容器中的总状态！！
const combineReducers = function combineReducers(reducers) {
    let reducerKeys = Reflect.ownKeys(reducers); //['vote','person']
    return function combination(state = {}, action) {
        // 合并后的reducer，后期再派发任务，是直接派发给这个函数的
        // 我们在这里可以把各个版块的reducer执行：把这个版块的状态和派发的对象传递进去、接收这个版块的返回值(这个版块的最新状态)，覆盖容器中的状态即可！！
        let nextState = {};
        reducerKeys.forEach(key => {
            let reducer = reducers[key]; //获取各个板块的reducer
            nextState[key] = reducer(state[key], action);
        });
        return nextState;
    };
}; 
*/