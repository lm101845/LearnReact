/* 把各版块的action合并为一个 */
import voteAction from "./voteAction";
import personAction from "./personAction";

const actions = {
    vote: voteAction,
    person: personAction
};
export default actions;