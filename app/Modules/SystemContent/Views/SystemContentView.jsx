import React from 'react';
import PropTypes from 'prop-types';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import WebStorage from '../../../WebStorage/WebStorage';
import SystemContentShow from './SystemContentShow';

export default class SystemContentView extends React.Component {
    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.UPDATE_PORTAL:
            case PortalActions.GO_TO_PAGE:
                break;

            default:
                break;
        }
    }

    getSystemContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'Setting List1':
                return (<SystemContentShow showContentName={'Setting List1'}/>);

            case 'Setting List2':
                return (<SystemContentShow showContentName={'Setting List2'}/>);

            case 'Setting List3':
                return (<SystemContentShow showContentName={'Setting List3'}/>);

            default:
                break;
        }
    };

    render() {
        return (
            <div className='machine-content'>
                {this.getSystemContentModel()}
            </div>
        );
    }
}

SystemContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
