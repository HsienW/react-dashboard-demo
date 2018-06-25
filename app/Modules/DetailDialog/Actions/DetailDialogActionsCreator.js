import {createAction} from 'redux-actions';
import * as DetailDialogActions from './DetailDialogActions';

const showDetailDialog = createAction(DetailDialogActions.SHOW_DETAIL_DIALOG);
const hideDetailDialog = createAction(DetailDialogActions.HIDE_DETAIL_DIALOG);
const detailItem = createAction(DetailDialogActions.DETAIL_ITEM);
const updateDialog = createAction(DetailDialogActions.UPDATE_DIALOG);

const openDetailItem = (itemId) => {
    return (dispatch) => {
        dispatch(detailItem(itemId));
    };
};

export {
    showDetailDialog,
    hideDetailDialog,
    openDetailItem,
    updateDialog,
};
