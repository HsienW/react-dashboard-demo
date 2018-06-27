import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Breadcrumb} from 'antd';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import './assets/NavbarView.scss';

export default class NavbarView extends React.Component {
    constructor() {
        super();
        this.state = {
            selectMenuType: 'Machine Management',
            currentSubMenu: 'Machine List3'
        };
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.GO_TO_PAGE:
                break;

            case PortalActions.UPDATE_PORTAL:
                this.setState({
                    selectMenuType: WebStorage.getSessionStorage(WebStorageKeys.SELECT_MENU_TYPE),
                    currentSubMenu: WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU)
                });
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div className="tool-bar">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>{this.state.selectMenuType}</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.state.currentSubMenu}</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span className="user-name">User Name</span>
                    <Avatar size="large" icon="user"/>
                </div>
            </div>
        );
    }
}

NavbarView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
