/**
 * @Author liming
 * @Date 2023/8/3 18:48
 **/
import {createStore} from "redux";
import reducer from './reducers'
const store = createStore(reducer)

export default store
