import { combineReducers } from 'redux';
import taskReducer from './taskReducer';

const reducer = combineReducers({
    task: taskReducer
});
export default reducer;