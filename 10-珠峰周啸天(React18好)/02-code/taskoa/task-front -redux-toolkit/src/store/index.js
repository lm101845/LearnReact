/**
 * @Author liming
 * @Date 2023/9/2 17:06
 **/
import {configureStore} from '@reduxjs/toolkit'
// import {createStore} from 'redux'   //已经不推荐这种方式了
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import taskSliceReducer from './features/taskSlice'
const store = configureStore({
    //指定reducer
    reducer:{
        //按模块管理各个切片导出的reducer
        task:taskSliceReducer
        //类似于reducer的合并,最后会按照指定的模块去管理各模块下的状态
    },
    //使用中间件:如果我们不指定任何中间件，则默认集成了reduxThunk
    //但是一旦设置，会整体替换默认值，需要手动指定thunk中间件
    middleware:[reduxLogger,reduxThunk]
})

export default store
