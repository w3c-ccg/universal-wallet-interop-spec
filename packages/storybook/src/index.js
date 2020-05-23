import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import * as serviceWorker from "./serviceWorker";

import createStore from "./store/create";

import { PAGES } from "./pages";

const { store, persistor, history } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Switch>
          {PAGES.map(({ exact, path, component }) => (
            <Route key={path} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
