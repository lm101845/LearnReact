/*
 * @Author: liming
 * @Date: 2021-08-30 18:10:29
 * @LastEditTime: 2021-08-30 19:32:54
 * @FilePath: \03-尚硅谷张天禹(好)\02-代码手敲\redux_test\src\redux\count_reducer.js
 */

/**
 * reducer可以初始化状态(很少,第一次)和加工状态(最常干的事情是这个)
 * 1.该文件是用于创建一个为Count组件服务的reducer,reducer的本质就是一个reducer
 * 2.reducer函数会接到五个参数，分别为：之前的状态(preState),动作【对象】(action)
 * 3.reducer只帮你干一件事，只帮你改状态，至于改完状态后能不能引起页面的重新更新，这个它是不管的
 * (我们需要通过某种办法监测一下，如果redux里面的状态发生了改变，那我就【自己】去调用render函数)
 */

// 函数countReducer是要有返回值的
// 注意：我们在reducer里面不管那么多的事情，只管最基本的动作：你是加还是减
// reducer不管到底是不是奇数加，是否要添加一个定期器，这些它不管的

// 类比：你点了一份菜，但是你忘了说不放香菜了，这个时候你不能闯入后厨说不要放香菜
// 细节上的问题——奇数再加/定时器你要么在组件里面就判断好了，要么在actions里面处理
// reducer是一个【纯函数】

// 在【初始化】的时候，reducer被调用，此时它比较特殊，【啥也不干，不加也不减！！！】
// 初始化的时候，传的【状态】是undefined,data不用传，就不需要写了

// 初始化写法3——使用默认参数
// preState=initState表示如果不传形参preState，那么它的默认值是initState，即0，也就是执行了初始化状态
// 这样写代码的可读性更高
const initState = 0  //初始化状态 
export default function countReducer(preState = initState, action) {
    // console.log(preState);
    // type: "@@redux/INITr.p.d.4.h.o"——后面的.p.d.4.h.o是随机字符，防止跟你写的type名字重复，那就完了
    // console.log(action);
    //初始化状态写法2
    // if (preState === undefined) preState = 0
    //此时属于初始化的过程

    // 从action对象中获取type,data
    const {
        type,
        data
    } = action

    // 在这里我们一般不写if判断
    // if (type === 'increment') {

    // } else if (type === 'decrement') {

    // } else if (type === 'incrementOdd') {

    // } else if (type === 'incrementWait') {

    // }

    //我们一般写switch case判断
    // 根据type决定如果加工数据
    switch (type) {
        case 'increment': //如果是加
            // console.log("@");
            return preState + data
            // break;
            // 代码有了return，就不用break了
        case 'decrement': //如果是减
            return preState - data
        default:
            // 【初始化】的时候，我不加也不减
            // return 0
            // 初始化状态写法1
            //return 0也是可以的，但是我们不这么写——我们在函数最前面进行判断

            return preState
            // 初始化状态写法2
    }
}