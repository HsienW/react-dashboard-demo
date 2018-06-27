import * as PortalActions from '../../Portal/Actions/PortalActions';

const AdvertisingContentReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case PortalActions.UPDATE_PORTAL:
        case PortalActions.GO_TO_PAGE:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default AdvertisingContentReducer;
