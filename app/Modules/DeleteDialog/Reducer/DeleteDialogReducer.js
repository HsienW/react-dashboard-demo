import * as DeleteDialogActions from '../Actions/DeleteDialogActions';

const DeleteDialogReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case DeleteDialogActions.SHOW_DELETE_DIALOG:
        case DeleteDialogActions.HIDE_DELETE_DIALOG:
        case DeleteDialogActions.DELETE_ITEM_SUCCESS:
        case DeleteDialogActions.UPDATE_DIALOG:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default DeleteDialogReducer;
