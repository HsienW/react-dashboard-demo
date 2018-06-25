import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DeleteDialogView from '../Views/DeleteDialogView';
import * as DeleteDialogActionsCreator from '../Actions/DeleteDialogActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.DeleteDialogReducer.actionType};
    },
    (dispatch) => {
        return {
            DeleteDialogActionsCreator: bindActionCreators(DeleteDialogActionsCreator, dispatch)
        };
    }
)(DeleteDialogView);
