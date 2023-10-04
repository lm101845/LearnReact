/**
 * @Author liming
 * @Date 2022/11/14 21:33
 **/

import redux from 'redux';

import reducer from './reducer.js';

const store = redux.createStore(reducer);

export default store;