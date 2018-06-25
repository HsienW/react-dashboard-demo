import {createAction} from 'redux-actions';
import * as PortalActions from './PortalActions';

const sendGoToPage = createAction(PortalActions.GO_TO_PAGE);

const goToPage = (goToPageObj) => {
    return (dispatch) => {
        dispatch(sendGoToPage(goToPageObj));
    };
};

const stopPortal = createAction(PortalActions.STOP_PORTAL);
const updatePortal = createAction(PortalActions.UPDATE_PORTAL);


export {
    goToPage,
    stopPortal,
    updatePortal
};
