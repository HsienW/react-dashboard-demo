import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavbarView from '../Views/NavbarView';
import * as PortalActionsCreator from '../../Portal/Actions/PortalActionsCreator';

export default connect(
    (state) => {
        return {actionType: state.NavbarReducer.actionType};
    },
    (dispatch) => {
        return {
            PortalActionsCreator: bindActionCreators(PortalActionsCreator, dispatch),
        };
    }
)(NavbarView);
