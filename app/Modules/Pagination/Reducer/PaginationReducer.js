import * as DeleteDialogActions from '../../DeleteDialog/Actions/DeleteDialogActions';
import * as AddDialogActions from '../../AddDialog/Actions/AddDialogActions';

const PaginationReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case AddDialogActions.ADD_ITEM_SUCCESS:
        case DeleteDialogActions.DELETE_ITEM_SUCCESS:
        case AddDialogActions.UPDATE_DIALOG:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default PaginationReducer;
