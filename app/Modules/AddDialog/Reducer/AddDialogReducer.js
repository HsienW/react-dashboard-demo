import * as AddDialogActions from '../Actions/AddDialogActions';

const AddDialogReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case AddDialogActions.SHOW_ADD_DIALOG:
        case AddDialogActions.HIDE_ADD_DIALOG:
        case AddDialogActions.ADD_ITEM_SUCCESS:
        case AddDialogActions.UPDATE_DIALOG:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default AddDialogReducer;
