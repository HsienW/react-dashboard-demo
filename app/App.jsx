import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReduxStore from './ReduxStore';
import PortalContainer from './Modules/Portal/Containers/PortalContainer';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import {Machine, User, Dealer, Merchandise, Advertising, Market, System} from './Loading';
import createHistory from 'history/createHashHistory';
import LeftMenuContainer from './Modules/LeftMenu/Containers/LeftMenuContainer';
import NavbarContainer from './Modules/Navbar/Containers/NavbarContainer';
import 'antd/lib/button/style/css';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/select/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/list/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/popover/style/css';
import 'antd/lib/table/style/css';
import 'antd/lib/tag/style/css';
import 'antd/lib/breadcrumb/style/css';
import 'antd/lib/avatar/style/css';

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
                            <Route path="/Machine Management" component={Machine}/>
                            <Route path="/User Management" component={User}/>
                            <Route path="/Dealer Management" component={Dealer}/>
                            <Route path="/Merchandise Management" component={Merchandise}/>
                            <Route path="/Advertising Management" component={Advertising}/>
                            <Route path="/Market Analysis" component={Market}/>
                            <Route path="/System Setting" component={System}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));