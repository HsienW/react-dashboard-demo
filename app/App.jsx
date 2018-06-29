import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReduxStore from './ReduxStore';
import PortalContainer from './Modules/Portal/Containers/PortalContainer';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import WebStorage from './WebStorage/WebStorage';
import * as WebStorageKeys from './WebStorage/WebStorageKeys';
import LeftMenuContainer from './Modules/LeftMenu/Containers/LeftMenuContainer';
import NavbarContainer from './Modules/Navbar/Containers/NavbarContainer';
import MachineContentContainer from './Modules/MachineContent/Containers/MachineContentContainer';
import UserContentContainer from './Modules/UserContent/Containers/UserContentContainer';
import DealerContentContainer from './Modules/DealerContent/Containers/DealerContentContainer';
import MerchandiseContentContainer from './Modules/MerchandiseContent/Containers/MerchandiseContentContainer';
import AdvertisingContentContainer from './Modules/AdvertisingContent/Containers/AdvertisingContentContainer';
import MarketContentContainer from './Modules/MarketContent/Containers/MarketContentContainer';
import SystemContentContainer from './Modules/SystemContent/Containers/SystemContentContainer';
import 'antd/dist/antd.css';

const history = createHistory();

const MainStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
};

const controlPage = () => {
    const menuType = WebStorage.getSessionStorage(WebStorageKeys.SELECT_MENU_TYPE);
    switch (menuType) {
        case 'Machine Management':
            return (<MachineContentContainer/>);

        case 'User Management':
            return (<UserContentContainer/>);

        case 'Dealer Management':
            return (<DealerContentContainer/>);

        case 'Merchandise Management':
            return (<MerchandiseContentContainer/>);

        case 'Advertising Management':
            return (<AdvertisingContentContainer/>);

        case 'Market Analysis':
            return (<MarketContentContainer/>);

        case 'System Setting':
            return (<SystemContentContainer/>);

        default:
            return (<div style={MainStyle}/>);
    }
};

render((
    <Provider store={ReduxStore}>
        <HashRouter>
            <Router history={history}>
                <div style={{width: '100%', height: '100%'}}>
                    <Route component={PortalContainer}/>
                    <div style={MainStyle}>
                        <LeftMenuContainer/>
                        <NavbarContainer/>
                        <Switch>
                            <Route exact path="/" component={controlPage}/>
                            <Route exact path="/Machine Management" component={controlPage}/>
                            <Route exact path="/User Management" component={controlPage}/>
                            <Route exact path="/Dealer Management" component={controlPage}/>
                            <Route exact path="/Merchandise Management" component={controlPage}/>
                            <Route exact path="/Advertising Management" component={controlPage}/>
                            <Route exact path="/Market Analysis" component={controlPage}/>
                            <Route exact path="/System Setting" component={controlPage}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));