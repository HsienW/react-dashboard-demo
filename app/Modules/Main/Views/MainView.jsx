import React from 'react';
import LeftMenuContainer from '../../LeftMenu/Containers/LeftMenuContainer';
import NavbarContainer from '../../Navbar/Containers/NavbarContainer';
import ContentContainer from '../../Content/Containers/ContentContainer';
import './assets/MainView.css';

const MainView = () => {
    return (
        <div className="main-block">
            <LeftMenuContainer />
            <NavbarContainer />
            <ContentContainer />
        </div>
    );
};

export default MainView;