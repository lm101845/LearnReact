/**
 * @Author liming
 * @Date 2023/8/3 20:40
 **/

//把各板块的action合并为一个action即可
import voteAction from "./voteAction";
import personalAction from "./personalAction";

const action = {
    vote:voteAction,
    personal:personalAction
}

export default action
