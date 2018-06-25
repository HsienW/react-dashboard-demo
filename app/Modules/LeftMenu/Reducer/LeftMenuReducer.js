import * as LeftMenuActions from '../Actions/LeftMenuActions';
import LeftMenuRespond from '../../../ApiCenter/MachineRespond/LeftMenuRespond';

const LeftMenuReducer = (state = {actionType: ''}, action) => {
    switch (action.type) {
        case LeftMenuActions.GET_MENU_SUCCESS:
            LeftMenuRespond.menuItems = action.payload;
            return {actionType: action.type};

        case LeftMenuActions.MENU_ITEM_CLICKED:
            return {actionType: action.type};

        default:
            return state;
    }
};

export default LeftMenuReducer;
