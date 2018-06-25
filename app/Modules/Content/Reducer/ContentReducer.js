import is from 'is_js';
import * as ContentActions from '../Actions/ContentActions';
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

const ContentReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case ContentActions.GET_MACHINE_DATA_SUCCESS:
            MachineContentRespond.machineDataItems = action.payload;
            return {actionType: action.type};

        case DeleteDialogActions.DELETE_ITEM:
            removeItem(action.payload);
            return {actionType: action.type};

        case ContentActions.MACHINE_DATA_ITEM_CLICKED:
        case ContentActions.EDIT_DATA_ITEM_SUCCESS:
        case DetailDialogActions.SHOW_DETAIL_DIALOG:
        case AddDialogActions.ADD_ITEM_SUCCESS:
        case PortalActions.GO_TO_PAGE:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default ContentReducer;
