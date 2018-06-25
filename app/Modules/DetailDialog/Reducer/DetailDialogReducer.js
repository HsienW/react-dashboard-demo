import * as DetailDialogActions from '../Actions/DetailDialogActions';

const DetailDialogReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case DetailDialogActions.SHOW_DETAIL_DIALOG:
        case DetailDialogActions.HIDE_DETAIL_DIALOG:
        case DetailDialogActions.UPDATE_DIALOG:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default DetailDialogReducer;
