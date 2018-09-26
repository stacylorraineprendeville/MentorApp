import React, { Component } from "react";
import axios from "axios";

import { Provider } from "react-redux";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import { multiClientMiddleware } from "redux-axios-middleware";

import Login from "./src/screens/Login";
import { login, env } from "./src/redux/reducer";

const clients = multiClientMiddleware({
  development: {
    client: axios.create({
      baseURL: "http://localhost:8080",
      responseType: "json"
    })
  },
  testing: {
    client: axios.create({
      baseURL: "https://testing.backend.povertystoplight.org",
      responseType: "json"
    })
  },
  demo: {
    client: axios.create({
      baseURL: "https://demo.backend.povertystoplight.org",
      responseType: "json"
    })
  },
  production: {
    client: axios.create({
      baseURL: "https://platform.backend.povertystoplight.org",
      responseType: "json"
    })
  }
});

const store = createStore(
  combineReducers({ login, env }),
  compose(
    applyMiddleware(clients),
    offline(offlineConfig)
  )
);

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}
