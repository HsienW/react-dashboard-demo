import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Breadcrumb} from 'antd';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as PortalActions from '../../Portal/Actions/PortalActions';
import './assets/NavbarView.css';

export default class NavbarView extends React.Component {
    constructor() {
        super();
        this.state = {
            selectMenuType: 'Machine Management',
            currentMenuPage: 'Machine List3'
        };
    }

    componentWillMount() {
        WebStorage.setSessionStorage(WebStorageKeys.SELECT_MENU_TYPE, this.state.selectMenuType);
        WebStorage.setSessionStorage(WebStorageKeys.CURRENT_MENU_PAGE, this.state.currentMenuPage);
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case PortalActions.GO_TO_PAGE:
                this.setState({selectMenuType:  WebStorage.getSessionStorage(WebStorageKeys.SELECT_MENU_TYPE)});
                this.setState({currentMenuPage:  WebStorage.getSessionStorage(WebStorageKeys.CURRENT_MENU_PAGE)});
                break;

            default:
                break;
        }
    }

    render() {
        return (
            <div  className="tool-bar">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>{this.state.selectMenuType}</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="">{this.state.currentMenuPage}</a></Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span className="user-name">User Name</span>
                    <Avatar size="large" icon="user" />
                </div>
            </div>
        );
    }
}

NavbarView.propTypes = {
    actionType: PropTypes.string.isRequired,
};
