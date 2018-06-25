import * as PortalActions from '../Actions/PortalActions';

const PortalReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        // case PortalActions.GO_TO_PAGE:
        case PortalActions.STOP_PORTAL:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default PortalReducer;
