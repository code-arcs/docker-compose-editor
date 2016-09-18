import React from "react";
import {render} from "react-dom";
import {createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import reducers from "./reducers";
import App from "./containers/App";
import ServiceDetails from "./components/ServiceDetails";

const store = createStore(
    combineReducers({
        app: reducers,
        routing: routerReducer
    })
);
const history = syncHistoryWithStore(hashHistory, store);

render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <Route path="service/:id" components={{content: ServiceDetails}}/>
                <Route path="*" component={App}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("dce-app-root")
);