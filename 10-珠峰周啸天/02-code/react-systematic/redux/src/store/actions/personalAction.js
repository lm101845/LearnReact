/**
 * @Author liming
 * @Date 2023/8/3 20:41
 **/

//personal板块要派发的行为对象管理
import * as TYPES from '../action-types'
const personalAction = {
    info(){
        return {
            type:TYPES.PERSONAL_OPP
        }
    },
}

export default personalAction
