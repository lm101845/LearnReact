import { combineReducers } from 'redux';
import baseReducer from './baseReducer';

/* 合并REDUCER */
const reducer = combineReducers({
    base: baseReducer
});
export default reducer;