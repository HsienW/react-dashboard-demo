import {combineReducers} from 'redux';
import PortalReducer from '../../Portal/Reducer/PortalReducer';
import LeftMenuReducer from '../../LeftMenu/Reducer/LeftMenuReducer';
import NavbarReducer from '../../Navbar/Reducer/NavbarReducer';
import AdvertisingContentReducer from '../../AdvertisingContent/Reducer/AdvertisingContentReducer';
import DealerContentReducer from '../../DealerContent/Reducer/DealerContentReducer';
import MarketContentReducer from '../../MarketContent/Reducer/MarketContentReducer';
import SystemContentReducer from '../../SystemContent/Reducer/SystemContentReducer';
import UserContentReducer from '../../UserContent/Reducer/UserContentReducer';
import MachineContentReducer from '../../MachineContent/Reducer/MachineContentReducer';
import MerchandiseContentReducer from '../../MerchandiseContent/Reducer/MerchandiseContentReducer';
import AddDialogReducer from '../../AddDialog/Reducer/AddDialogReducer';
import DeleteDialogReducer from '../../DeleteDialog/Reducer/DeleteDialogReducer';
import DetailDialogReducer from '../../DetailDialog/Reducer/DetailDialogReducer';

const MainReducer = combineReducers({
    PortalReducer,
    LeftMenuReducer,
    AddDialogReducer,
    NavbarReducer,
    AdvertisingContentReducer,
    DealerContentReducer,
    UserContentReducer,
    MarketContentReducer,
    MerchandiseContentReducer,
    SystemContentReducer,
    MachineContentReducer,
    DeleteDialogReducer,
    DetailDialogReducer
});

export default MainReducer;
