import React from 'react';
import PropTypes from 'prop-types';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import WebStorage from '../../../WebStorage/WebStorage';
import MarketContentShow from './MarketContentShow';

export default class MarketContentView extends React.Component {
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

    getMarketContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'AD Analysis1':
                return (<MarketContentShow showContentName={'AD Analysis1'}/>);

            case 'AD Analysis2':
                return (<MarketContentShow showContentName={'AD Analysis2'}/>);

            case 'AD Analysis3':
                return (<MarketContentShow showContentName={'AD Analysis3'}/>);

            default:
                break;
        }
    };

    render() {
        return (
            <div className='machine-content'>
                {this.getMarketContentModel()}
            </div>
        );
    }
}

MarketContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
