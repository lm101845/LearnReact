import { createStore } from './myredux';
import _ from '@/assets/utils';

/* 创建REDUCER：统一修改公共状态 */
let initialState = {
    supNum: 10,
    oppNum: 5
};
const reducer = function reducer(state = initialState, action) {
    // state:容器中的公共状态「第一次派发，没有公共状态的时候，我们让其等于初始状态」
    // action:每一次派发任务，传递进来的“行为对象”「必须要包含一个type属性(行为标识)，其余可根据需求，传递其他信息进来」
    state = _.clone(true, state);
    let { type, payload = 1 } = action;
    // reducer中会基于派发的行为标识不同，修改不同的公共状态「reducer判断中用到的行为标识，一定要和每一次派发时，传递的行为标识对应上」
    switch (type) {
        case 'VOTE_SUP':
            state.supNum += payload;
            break;
        case 'VOTE_OPP':
            state.oppNum += payload;
            break;
        default:
    }
    // return的值会替换现有公共状态的信息
    return state;
};

/* 创建STORE */
const store = createStore(reducer);
export default store;