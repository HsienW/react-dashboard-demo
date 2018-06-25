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
                    obj.setAttribute('id', 'enter');
                    Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
                        subObj.setAttribute('id', 'sub-enter');
                    });
                    WebStorage.setSessionStorage(WebStorageKeys.SELECT_MENU_TYPE, obj.childNodes[0].textContent);
                    return;
                }

                if (is.include(obj.textContent, currentMenu)) {
                    obj.setAttribute('id', 'enter');
                    Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
                        subObj.setAttribute('id', 'sub-enter');
                    });
                    WebStorage.setSessionStorage(WebStorageKeys.SELECT_MENU_TYPE, obj.childNodes[0].textContent);
                    WebStorage.setSessionStorage(WebStorageKeys.CURRENT_MENU_PAGE, currentMenu);
                    this.props.PortalActionsCreator.goToPage();
                    return;
                }
                obj.removeAttribute('id');
                Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
                    subObj.removeAttribute('id');
                });
            });
        });
    }

    defaultOpenMenu = () => {
        const menuTitle = document.querySelector('.left-menu-title');
        const subMenuTitle = menuTitle.querySelectorAll('.left-submenu-title');
        const initialMenu = WebStorage.getSessionStorage(WebStorageKeys.SELECT_MENU_TYPE);

        subMenuTitle.forEach((obj) => {
            if (is.equal(initialMenu, obj.childNodes[0].textContent)) {
                obj.setAttribute('id', 'enter');
                Array.from(obj.childNodes[1].childNodes).forEach((subObj) => {
                    subObj.setAttribute('id', 'sub-enter');
                });
            }
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
