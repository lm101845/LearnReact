import React, {useContext, useMemo} from 'react'
import PropTypes from 'prop-types'
import ThemeContext from '@/ThemeContext'

//写法1
// const VoteMain = () => {
//     //useMemo是一个React钩子，用来记忆函数的输出。
//     // let ratio = useMemo(() => {
//     //     let ratio = '--', total = supNum + oppNum
//     //     if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
//     //     return ratio
//     // }, [supNum, oppNum])
//
//
//     return <ThemeContext.Consumer>
//         {context => {
//             let {supNum, oppNum} = context
//             return <div className="main">
//                 <p>支持人数：{supNum}人</p>
//                 <p>反对人数：{oppNum}人</p>
//                 {/*<p>支持比率：{ratio}</p>*/}
//             </div>
//         }}
//     </ThemeContext.Consumer>;
// }

// VoteMain.contextType = ThemeContext
//报错：Function components do not support contextType.

//写法2
const VoteMain = () => {
    let {supNum, oppNum} = useContext(ThemeContext)
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        {/*<p>支持比率：{ratio}</p>*/}
    </div>
};
export default VoteMain
