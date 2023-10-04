/* Vote版块的reducer */
import { VOTE_SUP, VOTE_OPP } from '../action-types';
import _ from '@/assets/utils';

let initial = {
    supNum: 10,
    oppNum: 5
};
export default function voteReducer(state = initial, action) {
    state = _.clone(true, state);
    let { type, payload = 1 } = action;
    switch (type) {
        case VOTE_SUP:
            state.supNum += payload;
            break;
        case VOTE_OPP:
            state.oppNum += payload;
            break;
        default:
    }
    return state;
};