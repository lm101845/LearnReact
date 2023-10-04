import { connect } from '@/my-react-redux';

const VoteMain = function VoteMain(props) {
    let { supNum, oppNum } = props;
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
    </div>;
};
export default connect(state => state.vote)(VoteMain);