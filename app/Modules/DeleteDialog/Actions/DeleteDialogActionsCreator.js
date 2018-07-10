import {createAction} from 'redux-actions';
import * as DeleteDialogActions from './DeleteDialogActions';
import ApiCenter from '../../../ApiCenter/ApiCenter';

const showDeleteDialog = createAction(DeleteDialogActions.SHOW_DELETE_DIALOG);
const hideDeleteDialog = createAction(DeleteDialogActions.HIDE_DELETE_DIALOG);

const deleteItemStart = createAction(DeleteDialogActions.DELETE_ITEM_START);
const deleteItemSuccess = createAction(DeleteDialogActions.DELETE_ITEM_SUCCESS);
const deleteItemFailed = createAction(DeleteDialogActions.DELETE_ITEM_FAILED);

const updateDialog = createAction(DeleteDialogActions.UPDATE_DIALOG);

const doDeleteItem = (request) => {
    return (dispatch) => {
        dispatch(deleteItemStart());
        ApiCenter.deleteMachineItem(request)
            .then((respond) => {
                dispatch(deleteItemSuccess(respond));
            })
            .catch((error) => {
                dispatch(deleteItemFailed(error));
            });
    };
};

export {
    showDeleteDialog,
    hideDeleteDialog,
    doDeleteItem,
    updateDialog,
};
