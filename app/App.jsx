import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import ReduxStore from './ReduxStore';
import PortalContainer from './Modules/Portal/Containers/PortalContainer';
import {HashRouter, Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
import Main from './Modules/Main/Views/MainView';
import 'antd/dist/antd.css';

const history = createHistory();
const controlPage = () => {
    return (
        <Main />
    );
};

render((
    <Provider store={ReduxStore}>
        <HashRouter>
            <Router history={history}>
                <div style={{width: '100%', height: '100%'}}>
                    <Route component={PortalContainer}/>
                    <Switch>
                        <Route exact path="/" component={controlPage}/>
                    </Switch>
                </div>
            </Router>
        </HashRouter>
    </Provider>
), document.getElementById('app'));