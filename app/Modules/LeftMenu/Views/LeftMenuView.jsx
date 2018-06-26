import React from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import {Icon} from 'antd';
import LeftMenuRespond from '../../../ApiCenter/MachineRespond/LeftMenuRespond';
import WebStorage from '../../../WebStorage/WebStorage';
import * as WebStorageKeys from '../../../WebStorage/WebStorageKeys';
import * as LeftMenuActions from '../Actions/LeftMenuActions';
import './assets/LeftMenuView.css';

export default class LeftMenuView extends React.Component {
    constructor() {
        super();
        this.state = {
            menuItems: [],
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

    componentDidUpdate() {
        this.defaultOpenMenu();

        const menuTitle = document.querySelector('.left-menu-title');
        menuTitle.addEventListener('click', (event) => {
            event.preventDefault();
            let currentMenu = event.target.textContent;
            if (is.empty(currentMenu)) {
                currentMenu = event.target.nextSibling.textContent;
            }
            const subMenuTitle = menuTitle.querySelectorAll('.left-submenu-title');

            subMenuTitle.forEach((obj) => {
                if (is.equal(currentMenu, obj.childNodes[0].textContent)) {
                    this.props.PortalActionsCreator.goToPage(
                        {
                            menuType: obj.childNodes[0].textContent,
                            subMenu: ''
                        }
                    );
                    this.handleClick(obj);
                    return;
                }

                if (is.include(obj.textContent, currentMenu)) {
                    this.props.PortalActionsCreator.goToPage(
                        {
                            menuType: obj.childNodes[0].textContent,
                            subMenu: currentMenu
                        }
                    );
                    this.handleClick(obj);
                    return;
                }
                obj.removeAttribute('id');
                Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
                    subObj.removeAttribute('id');
                    subObj.removeAttribute('name');
                });
            });
        });
    }

    defaultOpenMenu = () => {
        const menuTitle = document.querySelector('.left-menu-title');
        const subMenuTitle = menuTitle.querySelectorAll('.left-submenu-title');
        const initialMenu = WebStorage.getSessionStorage(WebStorageKeys.SELECT_MENU_TYPE);

        subMenuTitle.forEach((obj) => {
            const currentItem = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
            if (is.equal(initialMenu, obj.childNodes[0].textContent)) {
                obj.setAttribute('id', 'enter');
                Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
                    subObj.setAttribute('id', 'sub-enter');
                    if(is.equal(subObj.textContent, currentItem)) {
                        subObj.setAttribute('name', 'current-sub-enter');
                    }
                });
            }
        });
    };

    handleClick = (obj) => {
        const currentItem = WebStorage.getSessionStorage(WebStorageKeys.CURRENT_SUB_MENU);
        obj.setAttribute('id', 'enter');
        Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
            subObj.setAttribute('id', 'sub-enter');
            if(is.equal(subObj.textContent, currentItem)) {
                subObj.setAttribute('name', 'current-sub-enter');
                return;
            }
            subObj.removeAttribute('name');
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
                                    className="left-submenu-title"
                                    key={menuItem.name}
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
                                                        itemID={subItem.type}
                                                    >
                                                        {subItem.title}
                                                        <div />
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
