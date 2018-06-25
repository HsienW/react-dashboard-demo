import {combineReducers} from 'redux';
import PortalReducer from '../../Portal/Reducer/PortalReducer';
import LeftMenuReducer from '../../LeftMenu/Reducer/LeftMenuReducer';
import NavbarReducer from '../../Navbar/Reducer/NavbarReducer';
import ContentReducer from '../../Content/Reducer/ContentReducer';
import AddDialogReducer from '../../AddDialog/Reducer/AddDialogReducer';
import DeleteDialogReducer from '../../DeleteDialog/Reducer/DeleteDialogReducer';
import DetailDialogReducer from '../../DetailDialog/Reducer/DetailDialogReducer';

const MainReducer = combineReducers({
    PortalReducer,
    LeftMenuReducer,
    NavbarReducer,
    ContentReducer,
    AddDialogReducer,
    DeleteDialogReducer,
    DetailDialogReducer
});

export default MainReducer;
