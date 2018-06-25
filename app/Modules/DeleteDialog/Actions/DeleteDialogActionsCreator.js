import {createAction} from 'redux-actions';
import * as DeleteDialogActions from './DeleteDialogActions';

const showDeleteDialog = createAction(DeleteDialogActions.SHOW_DELETE_DIALOG);
const hideDeleteDialog = createAction(DeleteDialogActions.HIDE_DELETE_DIALOG);
const deleteItem = createAction(DeleteDialogActions.DELETE_ITEM);
const updateDialog = createAction(DeleteDialogActions.UPDATE_DIALOG);


const doDeleteItem = (itemId) => {
    return (dispatch) => {
        dispatch(deleteItem(itemId));
    };
};

export {
    showDeleteDialog,
    hideDeleteDialog,
    doDeleteItem,
    updateDialog,
};
