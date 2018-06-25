import {createAction} from 'redux-actions';
import * as MachineContentActions from './MachineContentActions';
import ApiCenter from '../../../ApiCenter/ApiCenter';

const getMachineDataStart = createAction(MachineContentActions.GET_MACHINE_DATA_START);
const getMachineDataSuccess = createAction(MachineContentActions.GET_MACHINE_DATA_SUCCESS);
const getMachineDataFailed = createAction(MachineContentActions.GET_MACHINE_DATA_FAILED);

const getMachineData = (requestName) => {
    return (dispatch) => {
        dispatch(getMachineDataStart());
        ApiCenter.getMachineContent(requestName)
            .then((respond) => {
                dispatch(getMachineDataSuccess(respond));
            })
            .catch((error) => {
                dispatch(getMachineDataFailed(error));
            });
    };
};

const editDataItemStart = createAction(MachineContentActions.EDIT_DATA_ITEM_START);
const editDataItemSuccess = createAction(MachineContentActions.EDIT_DATA_ITEM_SUCCESS);
const editDataItemFailed = createAction(MachineContentActions.EDIT_DATA_ITEM_FAILED);

const doEditDataItem = (requestName) => {
    return (dispatch) => {
        dispatch(editDataItemStart());
        ApiCenter.editMachineItem(requestName)
            .then((respond) => {
                dispatch(editDataItemSuccess(respond));
            })
            .catch((error) => {
                dispatch(editDataItemFailed(error));
            });
    };
};

const menuItemClicked = createAction(MachineContentActions.MACHINE_DATA_ITEM_CLICKED);

export {
    getMachineData,
    doEditDataItem,
    menuItemClicked,
};
