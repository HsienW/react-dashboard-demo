import * as PortalActions from '../../Portal/Actions/PortalActions';

const NavbarReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case PortalActions.GO_TO_PAGE:
        case PortalActions.UPDATE_PORTAL:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default NavbarReducer;
