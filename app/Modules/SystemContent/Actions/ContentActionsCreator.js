import {createAction} from 'redux-actions';
import * as ContentActions from './ContentActions';
import ApiCenter from '../../../ApiCenter/ApiCenter';

const getMachineDataStart = createAction(ContentActions.GET_MACHINE_DATA_START);
const getMachineDataSuccess = createAction(ContentActions.GET_MACHINE_DATA_SUCCESS);
const getMachineDataFailed = createAction(ContentActions.GET_MACHINE_DATA_FAILED);

const getMachineData = (requestName) => {
    return (dispatch) => {
        dispatch(getMachineDataStart());
        ApiCenter.getMachineContent(requestName)
            .then((respond) => {
                console.log(respond);
                dispatch(getMachineDataSuccess(respond));
            })
            .catch((error) => {
                dispatch(getMachineDataFailed(error));
            });
    };
};

const editDataItemStart = createAction(ContentActions.EDIT_DATA_ITEM_START);
const editDataItemSuccess = createAction(ContentActions.EDIT_DATA_ITEM_SUCCESS);
const editDataItemFailed = createAction(ContentActions.EDIT_DATA_ITEM_FAILED);

const doEditDataItem = (requestName) => {
    return (dispatch) => {
        dispatch(editDataItemStart());
        ApiCenter.editMachineItem(requestName)
            .then((respond) => {
                console.log(respond);
                dispatch(editDataItemSuccess(respond));
            })
            .catch((error) => {
                dispatch(editDataItemFailed(error));
            });
    };
};

const menuItemClicked = createAction(ContentActions.MACHINE_DATA_ITEM_CLICKED);
//
// const forceUpdatePublicChannelList =
//     createAction(LeftMenuActions.FORCE_UPDATE_PUBLIC_CHANNEL_LIST);

export {
    getMachineData,
    doEditDataItem,
    menuItemClicked,
    // forceUpdatePublicChannelList,
};
