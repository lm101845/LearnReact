/* Vote版块下派发行为对象的管理 */
import { VOTE_SUP, VOTE_OPP } from '../action-types';

const voteAction = {
    support(payload) {
        return {
            type: VOTE_SUP,
            payload
        };
    },
    oppose() {
        return {
            type: VOTE_OPP
        };
    }
};
export default voteAction;