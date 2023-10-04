/**
 * @Author liming
 * @Date 2023/9/7 9:41
 **/

//合并acton(没有特定API)
import baseAction from "./base";
import storeAction from "./store";

const action = {
    base:baseAction,
    store:storeAction
}

export default action
