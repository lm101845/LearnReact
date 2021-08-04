import {
  CHANGE_BANNERS,
  CHANGE_RECOMMEND
} from './constants.js';

// 拆分homeReducer
const initialHomeState = {
  banners: [],
  recommends: []
}
function homeReducer(state = initialHomeState, action) {
  switch (action.type) {
    case CHANGE_BANNERS:
      return { ...state, banners: action.banners };
    case CHANGE_RECOMMEND:
      return { ...state, recommends: action.recommends };
    default:
      return state;
  }
}

export default homeReducer;