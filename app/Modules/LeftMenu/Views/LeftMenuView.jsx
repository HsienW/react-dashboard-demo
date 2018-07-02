import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import LeftMenuRespond from '../../../ApiCenter/MachineRespond/LeftMenuRespond';
import * as LeftMenuActions from '../Actions/LeftMenuActions';
import './assets/LeftMenuView.scss';

export default class LeftMenuView extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: [],
            isSubMenuClick: 'Machine Management',
            isSubItemClick: 'Machine List3'
        };
    }

    componentWillMount() {
        this.props.LeftMenuActionsCreator.getMenu('LeftMenu');
    }

    componentWillReceiveProps(nextProps) {
        switch (nextProps.actionType) {
            case LeftMenuActions.GET_MENU_SUCCESS:
                this.setState({menuItems: LeftMenuRespond.menuItems});
                break;

            default:
                break;
        }
    }

    submenuClick = (key) => {
        this.setState({isSubMenuClick: key});
        this.props.PortalActionsCreator.goToPage({menuType: key, subMenu: ''});
    };

    submenuItemClick = (event) => {
        event.stopPropagation();
        this.setState({
            isSubMenuClick: event.target.parentNode.parentNode.childNodes[0].textContent,
            isSubItemClick: event.target.textContent
        });
        this.props.PortalActionsCreator.goToPage({
            menuType: this.state.isSubMenuClick,
            subMenu: event.target.textContent
        });
    };

    render() {
        return (
            <div className="left-menu">
                <div className="left-menu-logo">
                    <span>IMV LOGO</span>
                </div>
                <ul className="left-menu-title">
                    {
                        this.state.menuItems.map((menuItem) => {
                            return (
                                <li
                                    id={this.state.isSubMenuClick === menuItem.name
                                        ? 'item-click'
                                        : null
                                    }
                                    className={'left-submenu-title item-hover'}
                                    key={menuItem.name}
                                    onClick={this.submenuClick.bind(this, menuItem.name)}
                                >
                                    <div>
                                        <Icon
                                            size={'lg'}
                                            color={'#ffffff'}
                                            type={`${menuItem.icon}`}
                                        />
                                        <span>{menuItem.name}</span>
                                    </div>
                                    <ul className="left-submenu-items">
                                        {
                                            menuItem.subitem.map((subItem) => {
                                                return (
                                                    <li
                                                        key={subItem.id}
                                                        itemID={subItem.id}
                                                        onClick={this.submenuItemClick}
                                                        ref={(ip) => this.test = ip}
                                                    >
                                                        {subItem.title}
                                                        <div className={
                                                            this.state.isSubItemClick === subItem.title
                                                                ? 'subitem-click'
                                                                : null
                                                        }/>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

LeftMenuView.propTypes = {
    actionType: PropTypes.string.isRequired,
    PortalActionsCreator: PropTypes.object.isRequired,
    LeftMenuActionsCreator: PropTypes.object.isRequired,
};
