/**
 * @Author liming
 * @Date 2023/9/3 21:13
 **/

//personal板块的store
import {observable,action} from 'mobx'
export default class PersonalStore{
    @observable info = null
    @action.bound queryInfo(){

    }
}
