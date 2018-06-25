import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MachineContentView from '../Views/MachineContentView';
import * as MachineContentActionsCreator from '../Actions/MachineContentActionsCreator';
import * as AddDialogActionsCreator from '../../AddDialog/Actions/AddDialogActionsCreator';
import * as DetailDialogActionsCreator from '../../DetailDialog/Actions/DetailDialogActionsCreator';
import * as DeleteDialogActionsCreator from '../../DeleteDialog/Actions/DeleteDialogActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.MachineContentReducer.actionType};
    },
    (dispatch) => {
        return {
            MachineContentActionsCreator: bindActionCreators(MachineContentActionsCreator, dispatch),
            AddDialogActionsCreator: bindActionCreators(AddDialogActionsCreator, dispatch),
            DetailDialogActionsCreator: bindActionCreators(DetailDialogActionsCreator, dispatch),
            DeleteDialogActionsCreator: bindActionCreators(DeleteDialogActionsCreator, dispatch)
        };
    }
)(MachineContentView);
