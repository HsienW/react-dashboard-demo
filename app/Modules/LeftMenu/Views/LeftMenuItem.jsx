import React from 'react';
import PropTypes from 'prop-types';
import is from 'is_js';
import {Menu, Icon} from 'antd';
import './assets/LeftMenuView.css';

const SubMenu = Menu.SubMenu;

export default class LeftMenuItem extends React.Component {
    constructor() {
        super();
        this.state = {
            collapse: false,
            openSubMenu: [],
            selectedSubMenu: [],
            isSubMenuClick: false,
        };
    }

    componentDidMount() {
        const leftMenu = Array.from(
            document.getElementsByClassName(
                'ant-menu left-submenu ant-menu-light ant-menu-root ant-menu-inline'
            )
        );
        leftMenu.forEach((obj) => {
            obj.addEventListener('mouseover', this.showSubMenu);
            obj.addEventListener('mouseleave', this.hideSubMenu);
        });
    }

    showSubMenu = (event) => {
        if (is.empty(event.target.textContent)) {
            return;
        }
        if (is.not.equal(event.target.className, 'ant-menu-submenu-title')) {
            return;
        }
        event.target.setAttribute('id', 'hover');
        event.target.click();
        this.setState({openSubMenu: [event.target.textContent]});
    };

    hideSubMenu = (event) => {
        if(is.equal(event.target.className, 'ant-menu left-submenu ant-menu-light ant-menu-root ant-menu-inline')) {
            const subMenuTitle = Array.from(document.querySelectorAll('.ant-menu-submenu-title'));
            subMenuTitle.forEach((obj) => {obj.removeAttribute('id');});
            this.setState({openSubMenu: []});
        }
    };

    subMenuClick = (event) => {
        const subMenuTitle = Array.from(document.querySelectorAll('.ant-menu-submenu-title'));
        subMenuTitle.forEach((obj) => {
            obj.removeAttribute('id');
            if(is.equal(event.key, obj.textContent)) {
                obj.setAttribute('id', 'item-over');
                this.setState({selectedSubMenu: [event.key]});
            }
        });
    };

    render() {
        return (
            <Menu
                defaultOpenKeys={['Machine Management']}
                className="left-submenu"
                style={{width: 320}}
                mode="inline"
                openKeys={this.state.openSubMenu}
                selectedKeys={this.state.selectedSubMenu}
            >
                <SubMenu
                    key={this.props.itemName}
                    onTitleClick={this.subMenuClick}
                    title={
                        <div>
                            <Icon
                                size={'lg'}
                                color={'#ffffff'}
                                type={`${this.props.itemIcon}`}
                            />
                            <span>{this.props.itemName}</span>
                        </div>
                    }
                >
                    {
                        this.props.subItem.map((item) => {
                            return (
                                <Menu.Item
                                    key={item.id}
                                    itemID={item.type}
                                    // LeftMenuActionsCreator={
                                    //     this.props.LeftMenuActionsCreator
                                    // }
                                >
                                    {item.title}
                                </Menu.Item>
                            );
                        })
                    }
                </SubMenu>
            </Menu>
        );
    }
}

LeftMenuItem.propTypes = {
    itemId: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    itemIcon: PropTypes.string.isRequired,
    subItem: PropTypes.array.isRequired,
    LeftMenuActionsCreator: PropTypes.object.isRequired
};
