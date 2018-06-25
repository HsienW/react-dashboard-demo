import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ContentView from '../Views/ContentView';
import * as ContentActionsCreator from '../Actions/ContentActionsCreator';
import * as AddDialogActionsCreator from '../../AddDialog/Actions/AddDialogActionsCreator';
import * as DetailDialogActionsCreator from '../../DetailDialog/Actions/DetailDialogActionsCreator';
import * as DeleteDialogActionsCreator from '../../DeleteDialog/Actions/DeleteDialogActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.ContentReducer.actionType};
    },
    (dispatch) => {
        return {
            ContentActionsCreator: bindActionCreators(ContentActionsCreator, dispatch),
            AddDialogActionsCreator: bindActionCreators(AddDialogActionsCreator, dispatch),
            DetailDialogActionsCreator: bindActionCreators(DetailDialogActionsCreator, dispatch),
            DeleteDialogActionsCreator: bindActionCreators(DeleteDialogActionsCreator, dispatch)
        };
    }
)(ContentView);
