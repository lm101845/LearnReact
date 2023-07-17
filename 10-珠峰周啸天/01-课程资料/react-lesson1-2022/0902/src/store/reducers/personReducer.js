import { PERSON_INFO } from '../action-types';
import _ from '@/assets/utils';

let initial = {
    info: null
};
export default function personReducer(state = initial, action) {
    state = _.clone(true, state);
    let { type } = action;
    switch (type) {
        case PERSON_INFO:
            // ...
            break;
        default:
    }
    return state;
};