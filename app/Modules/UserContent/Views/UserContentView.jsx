import React from 'react';
import PropTypes from 'prop-types';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import WebStorage from '../../../WebStorage/WebStorage';
import UserContentShow from './UserContentShow';

export default class UserContentView extends React.Component {
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

    getUserContentModel = () => {
        const sunMenu = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        switch (sunMenu) {
            case 'User List1':
                return (<UserContentShow showContentName={'User List1'}/>);

            case 'User List2':
                return (<UserContentShow showContentName={'User List2'}/>);

            case 'User List3':
                return (<UserContentShow showContentName={'User List3'}/>);

            default:
                break;
        }
    };

    render() {
        return (
            <div className='machine-content'>
                {this.getUserContentModel()}
            </div>
        );
    }
}

UserContentView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
