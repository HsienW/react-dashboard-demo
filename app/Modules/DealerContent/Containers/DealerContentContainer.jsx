import {connect} from 'react-redux';
import DealerContentView from '../Views/DealerContentView';

export default connect(
    (state) => {
        return {actionType: state.DealerContentReducer.actionType};
    }
)(DealerContentView);
