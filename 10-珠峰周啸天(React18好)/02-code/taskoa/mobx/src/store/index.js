/**
 * @Author liming
 * @Date 2023/9/3 21:16
 **/

import TaskStore from "./TaskStore";
import PersonalStore from "./PersonalStore";

class Store{
    constructor() {
        this.task = new TaskStore(this)
        this.personal = new PersonalStore(this)
    }
}

export default new Store()

// store = {
//     task:{
//         taskList:null,
//         __proto__:TaskStore.prototype
//         queryAllTaskAction
//         removeTaskAction
//         updateTaskAction
//     },
//     personal:{
//         info:null,
//         __proto__: Store.prototype
//         queryInfo
//     },
// }
