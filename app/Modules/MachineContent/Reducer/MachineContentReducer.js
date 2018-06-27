import * as MachineContentActions from '../Actions/MachineContentActions';
import * as AddDialogActions from '../../AddDialog/Actions/AddDialogActions';
import * as DetailDialogActions from '../../DetailDialog/Actions/DetailDialogActions';
import * as DeleteDialogActions from '../../DeleteDialog/Actions/DeleteDialogActions';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';

const MachineContentReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case MachineContentActions.GET_MACHINE_DATA_SUCCESS:
            MachineContentRespond.machineDataItems = action.payload;
            return {actionType: action.type};

        case AddDialogActions.ADD_ITEM_SUCCESS:
            MachineContentRespond.machineDataItems = action.payload;
            return {actionType: action.type};

        case DeleteDialogActions.DELETE_ITEM_SUCCESS:
            MachineContentRespond.machineDataItems = action.payload;
            return {actionType: action.type};

        case MachineContentActions.MACHINE_DATA_ITEM_CLICKED:
        case MachineContentActions.EDIT_DATA_ITEM_SUCCESS:
        case MachineContentActions.UPDATE_MACHINE_DATA:
        case DetailDialogActions.SHOW_DETAIL_DIALOG:
        case PortalActions.GO_TO_PAGE:
        case PortalActions.UPDATE_PORTAL:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default MachineContentReducer;
