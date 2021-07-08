import {put, takeEvery} from 'redux-saga/effects'
import {REQ_ALL_ITEM, GET_ALL_ITEM} from './actionTypes'
import {getTodoList} from './../api/index'

function* getAllItem() {
    const result = yield getTodoList();
    console.log(result);
    if(result.success_code === 200){
         const todos = result.items;
        yield put({
             type: GET_ALL_ITEM,
             todos
         })
    }
}

function* mySaga() {
    // console.log('aaaa');
     yield takeEvery(REQ_ALL_ITEM, getAllItem);
}
export default mySaga;