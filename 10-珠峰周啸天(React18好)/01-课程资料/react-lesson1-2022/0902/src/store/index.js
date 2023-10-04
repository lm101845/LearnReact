import { createStore } from 'redux';
import reducer from './reducers';

/* 创建STORE */
const store = createStore(reducer);
export default store;