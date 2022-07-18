import './ComfirmModal.css';
import Card from "../Card/Card";

const ConfirmModal = props => {

    return <Card className="confirmModal">
        <div className="confirmText">
            <p>该操作不可恢复！确认吗？</p>
        </div>
        <div className="confirmButton">
            <button className="okButton">确认</button>
            <button>取消</button>
        </div>
    </Card>;
};

export default ConfirmModal;
