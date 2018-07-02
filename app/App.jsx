import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReduxStore from './ReduxStore';
import PortalContainer from './Modules/Portal/Containers/PortalContainer';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
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
                            <Route path="/Machine Management" component={MachineContentContainer}/>
                            <Route path="/User Management" component={UserContentContainer}/>
                            <Route path="/Dealer Management" component={DealerContentContainer}/>
                            <Route path="/Merchandise Management" component={MerchandiseContentContainer}/>
                            <Route path="/Advertising Management" component={AdvertisingContentContainer}/>
                            <Route path="/Market Analysis" component={MarketContentContainer}/>
                            <Route path="/System Setting" component={SystemContentContainer}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));