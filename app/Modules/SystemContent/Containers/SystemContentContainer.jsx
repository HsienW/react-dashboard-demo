import {connect} from 'react-redux';
import SystemContentView from '../Views/SystemContentView';

export default connect(
    (state) => {
        return {actionType: state.SystemContentReducer.actionType};
    },
)(SystemContentView);
