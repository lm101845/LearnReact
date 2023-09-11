/**
 * @Author liming
 * @Date 2023/8/3 20:41
 **/

//vote板块要派发的行为对象管理
import * as TYPES from '../action-types'
//延迟函数，返回promise实例，在指定的时间后，才会让实例成功

const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

const voteAction = {
    //thunk中间件的语法
    support() {
        return async (dispatch) => {
            await delay();
            dispatch ({
                type: TYPES.VOTE_SUP
            })
        }
    },
    //redux-promise中间件可以这么写
    async oppose() {
        await delay();
        return {
            type: TYPES.VOTE_OPP
        }
    }
}

export default voteAction
