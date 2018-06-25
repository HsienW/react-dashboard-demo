import is from 'is_js';
import * as MachineContentActions from '../Actions/MachineContentActions';
import * as AddDialogActions from '../../AddDialog/Actions/AddDialogActions';
import * as DetailDialogActions from '../../DetailDialog/Actions/DetailDialogActions';
import * as DeleteDialogActions from '../../DeleteDialog/Actions/DeleteDialogActions';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import MachineContentRespond from '../../../ApiCenter/MachineRespond/MachineContentRespond';

const removeItem = (target) => {
    const data = MachineContentRespond.machineDataItems.filter((item) => {
        return is.not.equal(item.id, target);
    });

    MachineContentRespond.machineDataItems = data;
};

const MachineContentReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case MachineContentActions.GET_MACHINE_DATA_SUCCESS:
            MachineContentRespond.machineDataItems = action.payload;
            return {actionType: action.type};

        case DeleteDialogActions.DELETE_ITEM:
            removeItem(action.payload);
            return {actionType: action.type};

        case MachineContentActions.MACHINE_DATA_ITEM_CLICKED:
        case MachineContentActions.EDIT_DATA_ITEM_SUCCESS:
        case DetailDialogActions.SHOW_DETAIL_DIALOG:
        case AddDialogActions.ADD_ITEM_SUCCESS:
        case PortalActions.GO_TO_PAGE:
        case PortalActions.UPDATE_PORTAL:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default MachineContentReducer;