import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {IndexRoute, Router, Route, hashHistory} from "react-router";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import {appReducer as app}  from "./reducers";
import App from "./containers/App";
import ServiceDetails from "./components/ServiceDetails";
import GlobalEnvVariables from "./containers/GlobalEnvVariables";
import ServiceList from "./components/ServiceList";
import Services from "./containers/Services";
import Service from "./containers/Service";

const store = createStore(
    combineReducers({
        app,
        routing: routerReducer
    })
);
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="/services" components={{sidebar: ServiceList}}/>
                <Route path="/services/:id" components={{sidebar: ServiceList, content: ServiceDetails}}/>
                <Route path="/env" components={{content: GlobalEnvVariables}}/>
                <Route path="*" component={App}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("dce-app-root")
);
