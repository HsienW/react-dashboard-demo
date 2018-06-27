import React from 'react';
import PropTypes from 'prop-types';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../Actions/PortalActions';

export default class PortalView extends React.Component {

    componentWillMount() {
        this.props.PortalActionsCreator.goToPage({menuType: 'Machine Management', subMenu: 'Machine List3'});
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.GO_TO_PAGE:
                this.goToPageHistory(WebStorage.getSessionStorage(WebStorageKeys.SELECT_MENU_TYPE));
                this.props.PortalActionsCreator.updatePortal();
                break;

            case PortalActions.STOP_PORTAL:
                break;

            default:
                break;
        }
    }

    goToPageHistory = (url) => {
        this.props.history.push(`${url}`);
        this.props.PortalActionsCreator.stopPortal();
    };

    render() {
        return null;
    }
}

PortalView.propTypes = {
    actionType: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
};
