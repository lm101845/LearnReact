import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import './Vote.less';
import { connect } from '@/my-react-redux';

const Vote = function Vote(props) {
    let { supNum, oppNum } = props;
    return <div className="vote-box">
        <header className="header">
            <h2 className="title">React真的很不错!!</h2>
            <span className="num">{supNum + oppNum}人</span>
        </header>
        <VoteMain />
        <VoteFooter />
    </div>;
};
export default connect(state => state.vote)(Vote);

/* export default connect(
    // mapStateToProps：函数，把公共状态当做属性传递给组件
    state => {
        // state获取的就是公共状态
        // return对象包含啥，就把啥基于属性传递给组件
        return {
            supNum: state.vote.supNum,
            info: state.person.info
        };
    }
)(Vote); */