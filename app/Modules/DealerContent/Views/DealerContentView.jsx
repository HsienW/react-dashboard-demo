import React from 'react';
import PropTypes from 'prop-types';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import WebStorage from '../../../WebStorage/WebStorage';
import DealerContentShow from './DealerContentShow';

export default class DealerContentView extends React.Component {
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

    getDealerContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'Dealer List1':
                return (<DealerContentShow showContentName={'Dealer List1'}/>);

            case 'Dealer List2':
                return (<DealerContentShow showContentName={'Dealer List2'}/>);

            case 'Dealer List3':
                return (<DealerContentShow showContentName={'Dealer List3'}/>);

            default:
                break;
        }
    };

    render() {
        return (
            <div className="machine-content">
                {this.getDealerContentModel()}
            </div>
        );
    }
}

DealerContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
