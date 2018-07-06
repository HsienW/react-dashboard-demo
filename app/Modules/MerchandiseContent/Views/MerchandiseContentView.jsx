import React from 'react';
import PropTypes from 'prop-types';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import WebStorage from '../../../WebStorage/WebStorage';
import MerchandiseContentShow from './MerchandiseContentShow';

export default class MerchandiseContentView extends React.Component {
    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.UPDATE_PORTAL:
            case PortalActions.GO_TO_PAGE:
                break;

            default:
                break;
        }
    }

    getMerchandiseContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'Merchandise List1':
                return (<MerchandiseContentShow showContentName={'Merchandise List1'}/>);

            case 'Merchandise List2':
                return (<MerchandiseContentShow showContentName={'Merchandise List2'}/>);

            case 'Merchandise List3':
                return (<MerchandiseContentShow showContentName={'Merchandise List3'}/>);

            default:
                break;
        }
    };

    render() {
        return (
            <div className='machine-content'>
                {this.getMerchandiseContentModel()}
            </div>
        );
    }
}

MerchandiseContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
