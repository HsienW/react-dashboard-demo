import {createAction} from 'redux-actions';
import * as LeftMenuActions from './LeftMenuActions';
import ApiCenter from '../../../ApiCenter/ApiCenter';

const getMenuStart = createAction(LeftMenuActions.GET_MENU_START);
const getMenuSuccess = createAction(LeftMenuActions.GET_MENU_SUCCESS);
const getMenuFailed = createAction(LeftMenuActions.GET_MENU_FAILED);

const getMenu = (requestName) => {
    return (dispatch) => {
        dispatch(getMenuStart());
        ApiCenter.getLeftMenu(requestName)
            .then((respond) => {
                console.log(respond);
                dispatch(getMenuSuccess(respond));
            })
            .catch((error) => {
                dispatch(getMenuFailed(error));
            });
    };
};

const menuItemClicked = createAction(LeftMenuActions.MENU_ITEM_CLICKED);

export {
    getMenu,
    menuItemClicked,
};
