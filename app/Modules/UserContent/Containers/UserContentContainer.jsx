import {connect} from 'react-redux';
import UserContentView from '../Views/UserContentView';

export default connect(
    (state) => {
        return {actionType: state.UserContentReducer.actionType};
    }
)(UserContentView);
