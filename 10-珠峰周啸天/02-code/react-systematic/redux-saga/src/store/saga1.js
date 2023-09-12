/**
 * @Author liming
 * @Date 2023/9/12 0:50
 **/
import {take,takeEvery,takeLatest,throttle,debounce,call,apply,fork,delay,put,select,all} from 'redux-saga/effects'
import * as TYPES from './action-types'

const api = {
    queryData(id,name){
        return new Promise(resolve => {
          setTimeout(()=>{
              let result = {code:0,data:[10,20,30,40,id,name]}
              resolve(result)
          },2000)
        })
    },
    queryBanner(){
        return new Promise(resolve => {
            setTimeout(()=>{
                let result = {code:0,data:[10,20,30,40]}
                resolve(result)
            },2000)
        })
    },
}
const queryData = function (){}
/*创建执行函数，在任务被监听后，去做异步操作[generator函数]*/
const workingCount = function *workingCount(action){
    // yield take('DEMO_COUNT')
    // yield take(`${TYPES.DEMO_COUNT}@SAGA@`)  //创建监听器，监听派发指定标识的异步任务
    console.log('当前派发的任务被监听到了11')
    // yield workingCount()
    // let {num} = yield select(state=>state.demo)
    // console.log(num,'num1')
    // console.log('workingCount函数执行了',action)
    // let {code,data}=yield call(api.queryData,108,'珠峰')
    // let {code,data}=yield apply(null,api.queryData,[1088,'珠峰'])
    // console.log(code,data,'数据获取成功')
    // yield delay(2000)   //启动一个延迟函数，模拟向服务器发送请求
    //派发任务，通知reducer执行
    //派发任务到reducer,等价于dispatch
    // yield put({
    //     type:TYPES.DEMO_COUNT,
    //     payload:action.payload
    // })
    // console.log(num,'num2')

    //并行
    //如果想实现并行效果，则基于yield all处理：等待所有请求都成功，再向下继续执行
    console.time('AAA')
    let {data,banner} = yield all({
        data:call(api.queryData,100,'珠峰'),
        banner:call(api.queryBanner)
    })
    console.log(data,banner,'data和banner')
    console.timeEnd('AAA')
}

/*创建监听器，监听派发的任务[generator函数]*/
const saga = function *saga(){
    // yield takeEvery(`${TYPES.DEMO_COUNT}@SAGA@`,workingCount)
    yield takeLatest(`${TYPES.DEMO_COUNT}@SAGA@`,workingCount)
    // yield throttle(500,`${TYPES.DEMO_COUNT}@SAGA@`,workingCount)
    // yield debounce(500,`${TYPES.DEMO_COUNT}@SAGA@`,workingCount)
}

export default saga
