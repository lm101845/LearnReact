/**
 * @Author liming
 * @Date 2023/8/3 20:41
 **/

//vote板块要派发的行为对象管理
import * as TYPES from '../action-types'
const voteAction = {
    support(){
        return {
            type:TYPES.VOTE_SUP
        }
    },
    oppose(){
        return {
            type:TYPES.VOTE_OPP
        }
    }
}

export default voteAction
