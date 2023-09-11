/**
 * @Author liming
 * @Date 2023/9/12 0:50
 **/
import {take,takeEvery,takeLatest,throttle,debounce,call,apply,fork,delay,put} from 'redux-saga/effects'
import * as TYPES from './action-types'

/*创建执行函数，在任务被监听后，去做异步操作[generator函数]*/
const workingCount = function *workingCount(action){
    console.log('workingCount函数执行了',action)
    yield delay(2000)   //启动一个延迟函数，模拟向服务器发送请求
    //派发任务，通知reducer执行
    yield put({
        type:TYPES.DEMO_COUNT,
        payload:action.payload
    })
}

/*创建监听器，监听派发的任务[generator函数]*/
const saga = function *saga(){
    // yield take('DEMO_COUNT')
    // yield take(`${TYPES.DEMO_COUNT}@SAGA@`)  //创建监听器，监听派发指定标识的异步任务
    // console.log('当前派发的任务被监听到了11')
    // yield workingCount()
    // yield put({
    //     type:'DEMO_COUNT',
    //     payload:10
    // })
    // console.log('当前派发的任务被监听到了22')
    yield takeEvery(`${TYPES.DEMO_COUNT}@SAGA@`,workingCount)
}

export default saga
