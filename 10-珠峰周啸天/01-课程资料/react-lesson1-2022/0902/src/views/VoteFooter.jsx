import actions from '@/store/actions';
import { connect } from '@/my-react-redux';

const VoteFooter = function VoteFooter(props) {
    let { support, oppose } = props;
    return <div className="footer">
        <button onClick={support.bind(null, 10)}>支持</button>
        <button onClick={oppose}>反对</button>
    </div>;
};
export default connect(
    null,
    actions.vote
)(VoteFooter);


/* export default connect(
    null,
    // mapDispatchToProps：函数，把派发的任务作为属性传递给组件
    dispatch => {
        // dispatch:store.dispatch
        // return对象中包含哪些方法，就把这些方法基于属性传递给组件即可
        return {
            support(payload) {
                dispatch(actions.vote.support(payload));
            },
            oppose() {
                dispatch(actions.vote.oppose());
            }
        };
    }
)(VoteFooter); */