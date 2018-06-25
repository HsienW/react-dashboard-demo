import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DetailDialogView from '../Views/DetailDialogView';
import * as DetailDialogActionsCreator from '../Actions/DetailDialogActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.DetailDialogReducer.actionType};
    },
    (dispatch) => {
        return {
            DetailDialogActionsCreator: bindActionCreators(DetailDialogActionsCreator, dispatch)
        };
    }
)(DetailDialogView);
