import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddDialogView from '../Views/AddDialogView';
import * as AddDialogActionsCreator from '../Actions/AddDialogActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.AddDialogReducer.actionType};
    },
    (dispatch) => {
        return {
            AddDialogActionsCreator: bindActionCreators(AddDialogActionsCreator, dispatch)
        };
    }
)(AddDialogView);
