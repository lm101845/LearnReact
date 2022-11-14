/**
 * @Author liming
 * @Date 2022/11/14 21:12
 **/

import store from './store/index.js'
import {
    addAction, subAction
} from './store/actionCreators.js';

store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch(addAction(10))
store.dispatch(addAction(15))
store.dispatch(subAction(8));
store.dispatch(subAction(5));
// store.dispatch(incAction());
// store.dispatch(decAction());

export default store