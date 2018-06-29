import {connect} from 'react-redux';
import PaginationView from '../Views/PaginationView';

export default connect(
    (state) => {
        return {actionType: state.PaginationReducer.actionType};
    }
)(PaginationView);
