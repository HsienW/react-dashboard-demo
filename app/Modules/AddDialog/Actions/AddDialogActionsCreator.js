import {createAction} from 'redux-actions';
import * as AddDialogActions from './AddDialogActions';
import ApiCenter from '../../../ApiCenter/ApiCenter';

const showAddDialog = createAction(AddDialogActions.SHOW_ADD_DIALOG);
const hideAddDialog = createAction(AddDialogActions.HIDE_ADD_DIALOG);

const addItemStart = createAction(AddDialogActions.ADD_ITEM_START);
const addItemSuccess = createAction(AddDialogActions.ADD_ITEM_SUCCESS);
const addItemFailed = createAction(AddDialogActions.ADD_ITEM_FAILED);

const updateDialog = createAction(AddDialogActions.UPDATE_DIALOG);

const doAddMachineItem = (request) => {
    return (dispatch) => {
        dispatch(addItemStart());
        ApiCenter.addMachineItem(request)
            .then((respond) => {
                dispatch(addItemSuccess(respond));
            })
            .catch((error) => {
                dispatch(addItemFailed(error));
            });
    };
};

export {
    showAddDialog,
    hideAddDialog,
    doAddMachineItem,
    updateDialog,
};
