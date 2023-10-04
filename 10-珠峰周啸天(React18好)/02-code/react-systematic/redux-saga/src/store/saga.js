/**
 * @Author liming
 * @Date 2023/9/12 0:50
 **/
import {
    take,
    takeEvery,
    takeLatest,
    throttle,
    debounce,
    call,
    apply,
    fork,
    delay,
    put,
    select,
    all
} from 'redux-saga/effects'
import * as TYPES from './action-types'

const api = {
    queryData(id, name) {
        return new Promise(resolve => {
            setTimeout(() => {
                let result = {code: 0, data: [10, 20, 30, 40, id, name]}
                resolve(result)
            }, 2000)
        })
    },
    queryBanner() {
        return new Promise(resolve => {
            setTimeout(() => {
                let result = {code: 0, data: [10, 20, 30, 40]}
                resolve(result)
            }, 2000)
        })
    },
}
const queryData = function () {
}
/*创建执行函数，在任务被监听后，去做异步操作*/
const workingCount = function* workingCount(action) {
    console.log('计数器')
    yield delay(1000)
    yield put({
        type:TYPES.DEMO_COUNT,
        payload:action.payload
    })
}
const workingSupport = function* workingSupport(action) {
    console.log('支持')
    yield delay(1000)
    yield put({
        type:TYPES.VOTE_SUP,
    })
}
const workingOppose = function* workingOppose(action) {
    console.log('反对')
    yield delay(1000)
    yield put({
        type:TYPES.VOTE_OPP,
    })
}

/*创建监听器，监听派发的异步任务*/
const saga = function* saga() {
    yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`,workingCount)
    yield takeLatest(`${TYPES.VOTE_SUP}@SAGA@`,workingSupport)
    yield takeLatest(`${TYPES.VOTE_OPP}@SAGA@`,workingOppose)
}

export default saga
