import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../Actions/PortalActions';


const PortalReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case PortalActions.GO_TO_PAGE:
            WebStorage.setSessionStorage(WebStorageKeys.SELECT_MENU_TYPE, action.payload.menuType);
            WebStorage.setSessionStorage(WebStorageKeys.CURRENT_SUB_MENU, action.payload.subMenu);
            return {actionType: action.type};

        case PortalActions.STOP_PORTAL:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default PortalReducer;
