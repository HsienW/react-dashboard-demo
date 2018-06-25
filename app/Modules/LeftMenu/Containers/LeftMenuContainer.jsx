import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeftMenuView from '../Views/LeftMenuView';
import * as PortalActionsCreator from '../../Portal/Actions/PortalActionsCreator';
import * as LeftMenuActionsCreator from '../Actions/LeftMenuActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.LeftMenuReducer.actionType};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalActionsCreator, dispatch),
            LeftMenuActionsCreator: bindActionCreators(LeftMenuActionsCreator, dispatch)
        };
    }
)(LeftMenuView);
