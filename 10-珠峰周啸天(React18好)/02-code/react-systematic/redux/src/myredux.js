/**
 * @Author liming
 * @Date 2023/8/3 15:11
 **/

/**
 * 实现redux的部分源码
 */
import _ from './assets/utils'
export const createStore = (reducer)=>{
    console.log('createStore函数执行了')
    if(typeof reducer !== 'function'){
        throw new Error('reducer必须是一个函数')
    }
    let state = undefined   //存放公共状态
    let listeners = []      //事件池(让组件更新的方法)

    //返回一个store对象，这个对象有3个方法
    //获取公共状态
    const getState = ()=>{
        //返回公共状态信息
        return state
    }

    //向事件池中加入让组件更新的方法
    const subscribe = (listener)=>{
        //规则校验
        if(typeof listener !== 'function') throw new TypeError("Listener is not a function")
        //对传入的方法(让组件更新的方法)加入到事件池中[需要做去重处理]
        if(!listeners.includes(listener)){
            listeners.push(listener)
        }
        //返回一个从事件池中，移除方法的函数
        return function unsubscribe(){
            let index = listeners.indexOf(listener)
            listeners.splice(index,1)
        }
    }

    //派发任务通知reducer执行的方法
    const dispatch = (action)=>{
        //规则校验
        if(!_.isPlainObject(action)) throw new TypeError('Action must be plain objects')
        //action对象必须要有type属性
        if(typeof action.type === 'undefined') throw new TypeError('Action  may not have an undefined "type"')

        //把reducer执行，传递2个参数:公共状态state和行为对象action
        //接收执行的返回值，替换公共状态
        state = reducer(state,action)

        //当状态更改，我们还需要把事件池中的方法执行
        listeners.forEach(listener=>{
            listener()
        })

        return action
        //最终返回结果还是action
    }

    /**redux内部会默认进行一次dispatch派发，目的：给公共容器状态赋初始值*/
    const randomString = ()=>Math.random().toString(36).substring(7).split('').join('.')
    dispatch({
        // type:Symbol()
        type: '@@@redux/INIT' + randomString()
    })
    return {
        getState,
        subscribe,
        dispatch
    }
}

