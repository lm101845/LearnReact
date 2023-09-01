/**
 * @Author liming
 * @Date 2023/9/1 16:54
 **/
import React, {createContext,useContext,useEffect,useState,useMemo} from "react";
import {bindActionCreators} from "redux";

const ThemeContext = createContext()

/*provider：把传递进来的store放在根组件的上下文中*/
export function Provider(props) {
    let {store, children} = props
    return <ThemeContext.Provider value={{store}}>
        {children}
    </ThemeContext.Provider>
}

/**connect方法：获取上下文中的store,然后把公共状态，要派发的方法等，都基于属性传递给需要渲染的组件;
 * 把让组件更新的方法放在redux事件池中
 * 返回结果需要时一个函数
 * */

/**
 * connect函数举例
 * export default connect(state=>state.vote,
 * //action.vote
 * dispatch => {
 *     return {
 *         support(){
 *             dispatch(action.vote.support())
 *         },
 *         oppose(){
 *             dispatch(action.vote.oppose())
 *         }
 *     }
 * }
 * )(Vote)
 */
export function connect(mapStateToProps,mapDispatchToProps){
    //处理默认值
    if(!mapStateToProps){
        mapStateToProps = ()=>{
            //不写则什么都不给组件传递
            return {}
        }
    }
    if(!mapDispatchToProps){
        mapDispatchToProps = (dispatch)=>{
            //不写则传递给组件一个dispatch方法
            return {dispatch}
        }
    }
    return function currying(Component){
        //component:最终要渲染的组件：如Vote
        //HOC:我们最后基于export default导出的组件
        return function HOC(props){
            //我们需要获取上下文中的store
            let {store} = useContext(ThemeContext)
            let {getState,dispatch,subscribe} = store
            //向事件池中加入让组件更新的方法
            let [_,forceUpdate] = useState(0)
            useEffect(()=>{
               let unsubscribe = subscribe(()=>{
                   forceUpdate(+new Date())
               })
                return ()=>{
                   //组件释放的时候执行:把放在事件池中的函数移除掉
                    unsubscribe()
                }
            },[])
            //把mapStateToProps和mapDispatchToProps这2个方法执行,把执行的返回值作为属性传递给组件！
            let state = getState()
            //useMemo是React中的一个Hook，它用于避免在每次渲染时都执行昂贵的计算。
            // useMemo接受一个计算函数和依赖项数组，返回一个记忆化的值。只有当依赖项发生变化时，计算函数才会重新执行，并返回新的值。
            let nextState = useMemo(()=>{
                return mapStateToProps(state)
            },[])
            let dispatchProps = {}
            if(typeof mapDispatchToProps === 'function'){
                //是函数直接执行
                dispatchProps = mapDispatchToProps(dispatch)
            }else{
                //是一个actionCreator对象，需要经过bindActionCreator对象处理
                dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
            }
            return <Component {...props}{...nextState}{...dispatchProps}/>
        }
    }
}
