import React from 'react';
import PropTypes from 'prop-types';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import WebStorage from '../../../WebStorage/WebStorage';
import AdvertisingContentShow from './AdvertisingContentShow';

export default class AdvertisingContentView extends React.Component {
    constructor() {
        super();
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.UPDATE_PORTAL:
            case PortalActions.GO_TO_PAGE:
                break;

            default:
                break;
        }
    }

    getAdvertisingContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'Advertising List1':
                return (<AdvertisingContentShow showContentName={'Advertising List1'}/>);

            case 'Advertising List2':
                return (<AdvertisingContentShow showContentName={'Advertising List2'}/>);

            case 'Advertising List3':
                return (<AdvertisingContentShow showContentName={'Advertising List3'}/>);

            default:
                break;
        }
    };

    render() {
        return (
            <div className="machine-content">
                {this.getAdvertisingContentModel()}
            </div>
        );
    }
}

AdvertisingContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
